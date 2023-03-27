import { AbstractRepository } from '@app/common';
import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { User } from './schema/users.schema';

@Injectable()
export class UserRepository extends AbstractRepository<User> {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectConnection() private userConnection: Connection,
  ) {
    super(userModel, userConnection);
  }
}
