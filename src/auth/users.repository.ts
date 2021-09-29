import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    const user = this.create(authCredentialsDto);
    try {
      await this.save(user);
    } catch (error) {
      // Duplicate Code
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Username already existed');
      } else {
        throw new InternalServerErrorException();
      }
    }
    return 'Successfully!';
  }
}
