import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfilesModule } from './profiles/profiles.module';
import { DbModule } from './db/db.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [ProfilesModule, DbModule, TasksModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}

// https://chatgpt.com/c/6a0c4a68-bac8-83a4-9d90-f8d2ebe358eb