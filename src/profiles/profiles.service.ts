import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePofileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import * as schema from '../db/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class ProfilesService {
  constructor(@Inject('DRIZZLE') private db: NodePgDatabase<typeof schema>) {}

  async findAll() {
    const users = await this.db.select().from(schema.users);
    return users;
  }

  async findById(id: string) {
    if(!id) return null;

    const user = await this.db.select().from(schema.users).where(eq(schema.users.id, id));
    if(user.length < 1) throw new NotFoundException('User not found');
    
    return user[0];
  }

  async findByEmail(email: string) {
    if(!email) return null;

    const user = await this.db.select().from(schema.users).where(eq(schema.users.email, email));
    return user[0];
  }

  async createOne(createProfileDto: CreatePofileDto) {
    const user = await this.findByEmail(createProfileDto.email!)
    if(user) throw new NotFoundException('User already exists!');

    const createdUser = await this.db.insert(schema.users).values({
      name: createProfileDto.name,
      email: createProfileDto.email,
      password: createProfileDto.password
    }).returning();

    return createdUser;
  }

  async updateOne(id: string, updateProfileDto: UpdateProfileDto) {
    const existingUser = await this.findById(id);
    if(!existingUser) throw new NotFoundException('User not found');

    const updatedUser = await this.db.update(schema.users)
    .set({ name: updateProfileDto.name })
    .where(eq(schema.users.id, id))
    .returning();

    return updatedUser;
  }

  async deleteOne(id: string) {
    const existingUser = await this.findById(id);
    if(!existingUser) throw new NotFoundException('User not found');
    
    const deletedUser = await this.db.delete(schema.users).where(eq(schema.users.id, id)).returning();
    return deletedUser;
  }
}
