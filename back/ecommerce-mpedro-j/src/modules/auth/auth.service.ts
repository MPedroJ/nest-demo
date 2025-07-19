import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import { Users } from 'src/entities/Users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/enums/roles.enum';
import { UserResponseDTO } from 'src/DTO/UsersDTOs/userResponse.dto';
import { SignUpDTO } from 'src/DTO/AuthDTOs/singUp.dto';
import { LoginDTO } from 'src/DTO/AuthDTOs/signIn.dto';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UsersRepository,
    @InjectRepository(Users)
    private readonly userDBRepository: Repository<Users>,
    private readonly jwtService: JwtService,
  ) {}
  getAuth() {
    return { message: 'Auth service is working' };
  }

  async signUpService(newUserInfo: SignUpDTO): Promise<UserResponseDTO> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...userWithoutConfirmPassword } = newUserInfo;

    const existingUser: Users | null = await this.userDBRepository.findOne({
      where: {
        email: newUserInfo.email,
      },
    });
    if (existingUser) throw new BadRequestException('Email already on use');

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const hashedPassword = await bcrypt.hash(newUserInfo.password, 10);

    const newUser: Users = this.userDBRepository.create({
      ...userWithoutConfirmPassword,
      password: hashedPassword,
    });
    const savedUser: Users = await this.userDBRepository.save(newUser);

    return savedUser;
  }

  async signInService(credentials: LoginDTO): Promise<string> {
    const user: Users | null = await this.userDBRepository.findOne({
      where: {
        email: credentials.email,
      },
    });
    if (!user) throw new BadRequestException('Email or Password are incorrect');

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const matchingPasswords = await bcrypt.compare(
      credentials.password,
      user.password,
    );

    if (!matchingPasswords)
      throw new BadRequestException('Email or Password are incorrect');

    const payload = {
      id: user.id,
      email: user.email,
      roles: [user.isAdmin ? Role.Admin : Role.User],
    };

    const token = this.jwtService.sign(payload);

    return token;
  }
}
