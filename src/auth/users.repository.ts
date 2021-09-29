import {
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async registerUser(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    const { username, password } = authCredentialsDto;

    // Hash Password with Salt
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({ username, password: hashedPassword });

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

  async loginUser(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    const { username, password } = authCredentialsDto;

    const user = await this.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      return 'Login Successful!';
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
}
