import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './mappers/task';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task-dto';

@Injectable()
export class TasksService {
  private tasks = [];
  public getAllTasks(): Task[] {
    return this.tasks;
  }

  public getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  public createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    return task;
  }

  public deleteTaskById(id: string): Boolean {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    return true;
  }

  public updateTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
