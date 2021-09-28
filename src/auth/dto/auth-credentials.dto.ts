import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { REG_EXP } from 'src/utils/constants';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  readonly username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(REG_EXP, {
    message: `password must contain at least 1 upper case letter, 1 lower case letter and 1 number or special character`,
  })
  readonly password: string;
}
