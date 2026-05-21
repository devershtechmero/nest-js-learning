import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import * as schema from '../db/schema';
import { eq } from 'drizzle-orm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(@Inject('DRIZZLE') private db: NodePgDatabase<typeof schema>) {}

  async getAllTasks() {
    const tasks = await this.db.select().from(schema.tasks);
    return tasks;
  }

  async getFindById(id: string) {
    if(!id) return null;

    const task = await this.db.select().from(schema.tasks).where(eq(schema.tasks.id, id));
    if(task.length < 1) throw new NotFoundException('Task not found');

    return task[0];
  }

  async getTaskByTitle(title: string) {
    if(!title) return null;

    const task = await this.db.select().from(schema.tasks).where(eq(schema.tasks.title, title));
    return task[0];
  }

  async findTasksByUserId(user_id: string) {
    if(!user_id) return null;

    const tasks = await this.db.select().from(schema.tasks).where(eq(schema.tasks.user, user_id));
    return tasks;
  }

  async createTask(createTaskDto: CreateTaskDto) {
    const task = await this.getTaskByTitle(createTaskDto.title);
    if(task) throw new NotFoundException('Task already exists!');

    const createdTask = await this.db.insert(schema.tasks).values({
      title: createTaskDto.title,
      description: createTaskDto.description,
      user: createTaskDto.user
    }).returning();

    return createdTask;
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto) {
    const task = await this.getFindById(id);
    if(!task) throw new NotFoundException('Task not found');

    const updatedTask = await this.db.update(schema.tasks)
    .set({ title: updateTaskDto.title,description: updateTaskDto.description })
    .where(eq(schema.tasks.id, id))
    .returning();

    return updatedTask;
  }

  async deleteOne(id: string) {
    const task = await this.getFindById(id);
    if(!task) throw new NotFoundException('Task not found');

    const deletedTask = await this.db.delete(schema.tasks).where(eq(schema.tasks.id, id)).returning();
    return deletedTask;
  }
}
