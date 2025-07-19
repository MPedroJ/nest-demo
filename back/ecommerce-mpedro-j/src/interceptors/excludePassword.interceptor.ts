import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class ExcludePasswordInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(map((data) => this.excludePassword(data)));
  }

  private excludePassword(data: any): unknown {
    if (!data) {
      return data;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (data.data && Array.isArray(data.data)) {
      return {
        ...data,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        data: data.data.map((item) => this.excludePassword(item)),
      };
    }
    if (Array.isArray(data)) {
      return data.map((item) => this.excludePassword(item));
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = data;

    return user;
  }
}
