import { HttpException, HttpStatus, Injectable  } from '@nestjs/common';
import { RegisterAuthDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import UserSchemaType from 'src/types/users.types/user.type';
import { LoginAuthDTO } from './dto/logindto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('Users') private readonly Users: Model<UserSchemaType>,
    private jwtService: JwtService,
  ) {}
  async register(body: RegisterAuthDto): Promise<Record<string, string>> {
    const { user_name, user_password, user_username } = body;

    const checkUsername = await this.Users.findOne({
      user_username: user_username.toLowerCase(),
    });

    if (checkUsername) {
      throw new HttpException(
        'This username already exsist',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await bcrypt.hash(user_password, 10);
    const newUser = await this.Users.create({
      user_name,
      user_username: user_username.toLowerCase(),
      user_password: hashPassword,
    });

    const userId = newUser._id;

    const userusername = newUser.user_username;

    const payload = { userId, userusername };
    const token = await this.jwtService.sign(payload);

    return { message: 'Succsessfuly Login', token: token };
  }
  async login(
    body: LoginAuthDTO,
  ): Promise<Record<string, string>> {
    const { user_username, user_password } = body;

    const checkUsername = await this.Users.findOne({
      user_username: user_username.toLowerCase(),
    });

    if (!checkUsername) {
      throw new HttpException(
        'Invalid  username or password',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hash = await bcrypt.compare(
      user_password,
      checkUsername.user_password,
    );

    if (!hash) {
      throw new HttpException(
        'Invalid password or username',
        HttpStatus.BAD_REQUEST,
      );
    }
    const userId = checkUsername._id;
    const userusername = checkUsername.user_username;

    const payload = { userId, userusername };
    const token = await this.jwtService.sign(payload);
    return { message: 'Succsessfuly Login', token: token };
  }
}
