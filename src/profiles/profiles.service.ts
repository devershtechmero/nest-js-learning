import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreatePofileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfilesService {
  private profiles = [
    {
      id: '645b1022-a4b6-4de9-9c8b-0460db2fa82a',
      name: 'John Doe',
      description: 'a random description'
    },
    {
      id: 'c6600c3a-d750-40ba-8333-3ec2e31ba279',
      name: 'Jane Smith',
      description: 'creative frontend developer'
    },
    {
      id: '39bc1461-d444-4179-9bc2-c1fab8b73728',
      name: 'Michael Johnson',
      description: 'sports card collector'
    },
    {
      id: '127b318b-cf48-4caf-b9cb-49ed33f2e4e2',
      name: 'Emily Davis',
      description: 'backend api specialist'
    },
    {
      id: 'e672b003-ef0c-4bbd-a125-107bbb2a11a9',
      name: 'Chris Wilson',
      description: 'full stack engineer'
    },
    {
      id: '1ee266f5-bf39-407a-add0-088d7e1131b5',
      name: 'Sophia Brown',
      description: 'next.js application builder'
    },
    {
      id: '95186901-1eb2-4da9-bd89-ae1015026757',
      name: 'Daniel Taylor',
      description: 'mongodb database manager'
    },
    {
      id: 'e8277cd5-a255-42c0-9935-4d179bec027e',
      name: 'Olivia Martinez',
      description: 'fastify node.js expert'
    },
    {
      id: '91f178a2-6ae3-4fe8-9c6a-623cf84c24c0',
      name: 'James Anderson',
      description: 'cloud deployment enthusiast'
    },
    {
      id: 'd80c0d24-214f-4782-a61e-1bcb38437943',
      name: 'Ava Thomas',
      description: 'typescript developer'
    }
  ]

  findAll() {
    if(!this.profiles || this.profiles.length < 1) return {};
    return this.profiles;
  }

  findById(id: string) {
    if(!id) return { message: "Profile ID is required" }
    return this.profiles.find(profile => profile.id === id);
  }

  createOne(createProfileDto: CreatePofileDto) {
    const find = this.profiles.find(profile => profile.id === createProfileDto.id);
    if(find) return { message: "User already exist" }

    const createdProfile = {
      id: randomUUID(),
      name: createProfileDto.name!,
      description: createProfileDto.description!
    }

    this.profiles.push(createdProfile);
    return createdProfile;
  }

  updateOne(id: string, updateProfileDto: UpdateProfileDto) {
    if(!this.findById(id)) return { message: "User not exist" };
    return updateProfileDto;
  }

  deleteOne(id: string) {
    if(!this.findById(id)) return { message: "User not exist" };
    return this.profiles.filter(profile => profile.id === id);
  }
}
