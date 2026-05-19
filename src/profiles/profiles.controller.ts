import { Controller, Get, Param, Query, Post, Body, Put, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { CreatePofileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfilesService } from './profiles.service';
import { randomUUID } from 'crypto';

@Controller('profiles')
export class ProfilesController {
  constructor(private profileService: ProfilesService) { }

  // GET /profiles - GET all profiles
  @Get()
  findAll() {
    return this.profileService.findAll();
  }

  // GET /profiles/id - GET single profile
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profileService.findById(id);
  }

  @Post()
  createProfile(@Body() createProfileDto: CreatePofileDto) {
    return this.profileService.createOne(createProfileDto)
  }

  @Put(':id')
  updateProfile(
    @Param('id') id: string,
    @Body() updateProfileDto: UpdateProfileDto
  ) {
    return {
      id,
      ...updateProfileDto
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteProfile(
    @Param('id') id: string
  ) {
    return {
      id: id,
      message: 'Profile deleted'
    }
  }
}
