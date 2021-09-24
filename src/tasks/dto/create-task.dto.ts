import { IsNotEmpty, IsOptional, Length, MaxLength } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @Length(10, 50)
  readonly title: string;

  @IsOptional()
  @MaxLength(50)
  readonly description: string;
}
