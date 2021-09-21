import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: '001',
      title: 'Task 01',
      description: 'This is task 01',
      status: TaskStatus.DONE,
    },
  ];

  public getAllTasks(): Task[] {
    return this.tasks;
  }
}
