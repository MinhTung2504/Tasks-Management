import { NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const { status, search } = filterDto;

    const query = this.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
        { search: `%${search}%` },
      );
    }

    const tasks = await query.getMany();
    return tasks;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.create(createTaskDto);

    await this.save(task);

    return task;
  }

  async getTaskById(id: string): Promise<Task> {
    const found = await this.findOne(id);

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return found;
  }

  async deleteTask(id: string): Promise<string> {
    const found = await this.getTaskById(id);

    await this.delete(found);

    return 'DELETED';
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.getTaskById(id);
    const { title, description, status } = updateTaskDto;
    task.title = title;
    task.description = description;
    task.status = status;

    await this.save(task);
    return task;
  }
}
