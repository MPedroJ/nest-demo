import { Injectable } from '@nestjs/common';
import { UploadApiResponse, v2 } from 'cloudinary';
import * as toStream from 'buffer-to-stream';

@Injectable()
export class CloudinaryRepository {
  async uploadImageRepository(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream(
        {
          resource_type: 'auto',
        },
        (error, result) => {
          if (error || !result) {
            // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
            reject(error);
          } else {
            resolve(result);
          }
        },
      );
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      toStream(file.buffer).pipe(upload);
    });
  }
}
