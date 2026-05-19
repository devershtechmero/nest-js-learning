import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreatePofileDto } from './dto/create-profile.dto';

@Injectable()
export class ProfilesService {
  private profiles = [
    {
      id: randomUUID(),
      name: 'John Doe',
      description: 'a random description'
    },
    {
      id: randomUUID(),
      name: 'Jane Smith',
      description: 'creative frontend developer'
    },
    {
      id: randomUUID(),
      name: 'Michael Johnson',
      description: 'sports card collector'
    },
    {
      id: randomUUID(),
      name: 'Emily Davis',
      description: 'backend api specialist'
    },
    {
      id: randomUUID(),
      name: 'Chris Wilson',
      description: 'full stack engineer'
    },
    {
      id: randomUUID(),
      name: 'Sophia Brown',
      description: 'next.js application builder'
    },
    {
      id: randomUUID(),
      name: 'Daniel Taylor',
      description: 'mongodb database manager'
    },
    {
      id: randomUUID(),
      name: 'Olivia Martinez',
      description: 'fastify node.js expert'
    },
    {
      id: randomUUID(),
      name: 'James Anderson',
      description: 'cloud deployment enthusiast'
    },
    {
      id: randomUUID(),
      name: 'Ava Thomas',
      description: 'typescript developer'
    }
  ]

  findAll() {
    return this.profiles;
  }

  findById(id: string) {
    return this.profiles.find(profile => profile.id === id);
  }

  createOne(createProfileDto: CreatePofileDto) {
    const createdProfile = {
      id: randomUUID(),
      name: createProfileDto.name!,
      description: createProfileDto.description!
    }
    
    this.profiles.push(createdProfile);
    return createdProfile;
  }
}
