import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './mappers/task';
import { CreateTaskDto } from './dto/create-task-dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get('/')
  public getAllTasks() {
    return this.taskService.getAllTasks();
  }

  @Get('/:id')
  public getTaskById(@Param('id') id: string): Task {
    return this.taskService.getTaskById(id);
  }

  @Post('/')
  public createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.taskService.createTask(createTaskDto);
  }

  @Delete('/:id')
  public deleteTaskById(@Param('id') id: string): Boolean {
    return this.taskService.deleteTaskById(id);
  }

  @Patch('/:id/status')
  public updateTaskStatus(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): Task {
    return this.updateTaskStatus(id, status);
  }
}
