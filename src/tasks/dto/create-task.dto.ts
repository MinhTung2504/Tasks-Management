import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  Length,
  MaxLength,
} from 'class-validator';
import { TaskStatus } from '../task-status.enum';

export class CreateTaskDto {
  @IsNotEmpty()
  @Length(10, 50)
  readonly title: string;

  @IsOptional()
  @MaxLength(50)
  readonly description: string;

  @IsEnum(TaskStatus)
  readonly status: TaskStatus = TaskStatus.OPEN;
}
