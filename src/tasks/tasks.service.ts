import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './mappers/task';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto';

@Injectable()
export class TasksService {
  private tasks = [];
  public getAllTasks(): Task[] {
    return this.tasks;
  }

  public getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status: taskStatus, search } = filterDto;
    let tasks = this.getAllTasks();
    if (taskStatus) {
      tasks = tasks.filter((task) => task.status === taskStatus);
    }
    if (search) {
      tasks = tasks.filter((task) => {
        return task.title.includes(search) || task.description.includes(search);
      });
    }
    return tasks;
  }

  public getTaskById(id: string): Task {
    const _id = this.tasks.find((task) => task.id === id);
    // No need for try catch. NestJS will handle this exception
    if (!_id) {
      throw new NotFoundException(`Task with id - ${_id} not found`);
    }
    return _id;
  }

  public createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    return {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
  }

  public deleteTaskById(id: string): boolean {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    return true;
  }

  public updateTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
