import { Controller, Get } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor (private taskService: TasksService) {}

  @Get()
  allTasks() {
    return this.taskService.findAll();
  }

  @Get(':id')
  getOneTaskById() {

  }
}
