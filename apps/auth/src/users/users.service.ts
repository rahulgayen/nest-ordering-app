import { Injectable } from '@nestjs/common';
import { CreateUserRequest } from './dto/create-user-request.dto';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}
  findUser(email: string) {
    return this.userRepository.findOne({ email });
  }
  createUser(user: CreateUserRequest) {
    return this.userRepository.create(user);
  }
}
