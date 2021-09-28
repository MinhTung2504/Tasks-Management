import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './task.entity';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}

  public createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }

  public getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto);
  }

  public async getTaskById(id: string): Promise<Task> {
    return this.tasksRepository.getTaskById(id);
  }

  public async deleteTask(id: string): Promise<string> {
    return this.tasksRepository.deleteTask(id);
  }

  public async updateTask(
    id: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return this.tasksRepository.updateTask(id, updateTaskDto);
  }
}
