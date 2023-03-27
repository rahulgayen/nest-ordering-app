import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from './users/schema/users.schema';
import { UsersService } from './users/users.service';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService, private jwtService: JwtService) {}
  async validateUser(email: string, pass: string) {
    const user = await this.userService.findUser(email);
    if (user && (await user).password === pass) {
      const { password, ...result } = await user;
      return result;
    }
    return null;
  }
  login(user: any) {
    const payload = { email: user.email, userId: user._id };
    return { access_token: this.jwtService.sign(payload) };
  }
}
