import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignInDto } from './dto/signin.dto';
import * as bcrypt from 'bcrypt';
import { User } from '@/users/entities';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '@/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signin({ email, password }: SignInDto) {
    let user: User;

    try {
      user = await this.usersService.findOne({
        where: { email },
        select: { id: true, password: true },
      });
    } catch {
      throw new UnauthorizedException({
        message: 'Authentication failed',
        error: 'Invalid email or password',
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException({
        message: 'Authentication failed',
        error: 'Invalid email or password',
      });
    }

    const payload = { sub: user.id, email: user.email };

    const accessToken = await this.jwtService.signAsync(payload);

    return { accessToken };
  }

  async signup({ firstname, lastname, email, password }: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt());

    await this.usersService.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    return true;
  }
}
