import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserRequest } from './dto/create-user-request.dto';
import { UsersService } from './users.service';

@Controller('auth/users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  createUser(@Body() request: CreateUserRequest) {
    return this.userService.createUser(request);
  }
}
