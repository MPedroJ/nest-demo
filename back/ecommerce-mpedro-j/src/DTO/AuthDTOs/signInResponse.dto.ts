import { ApiProperty } from '@nestjs/swagger';

export class SignInResponseDTO {
  @ApiProperty({ example: 'User logged succesfully' })
  success: string;

  @ApiProperty({ example: 'This will display the token' })
  token: string;
}
