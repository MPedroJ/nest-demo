import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users.entity';
import { Role } from 'src/enums/roles.enum';
import { Repository } from 'typeorm';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest();

    const user = await this.usersRepository.findOne({
      where: {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        id: request.user.id,
      },
    });

    const hasRoles: Role[] = user?.isAdmin
      ? [Role.Admin, Role.User]
      : [Role.User];

    const isAdmin = requiredRoles.some((role) => hasRoles.includes(role));

    if (!isAdmin)
      throw new ForbiddenException(
        `You don't have permission and are not allowed to access this route`,
      );

    return isAdmin;
  }
}
