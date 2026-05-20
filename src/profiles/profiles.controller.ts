import { Controller, Get, Param, Post, Body, Put, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { CreatePofileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfilesService } from './profiles.service';

@Controller('profiles')
export class ProfilesController {
  constructor(private profileService: ProfilesService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.profileService.findAll();
  }

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
    return this.profileService.updateOne(id, updateProfileDto)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteProfile(
    @Param('id') id: string
  ) {
    return this.profileService.deleteOne(id)
  }
}
