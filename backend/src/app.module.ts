import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FriendsModule } from './features/friends/friends.module';
import { NewsfeedModule } from './features/newsfeed/newsfeed.module';
import { UsersModule } from './features/users/users.module';
import { AnswersModule } from './features/answers/answers.module';
import { PromptsModule } from './features/prompts/prompts.module';

@Module({
  imports: [
    FriendsModule,
    NewsfeedModule,
    UsersModule,
    AnswersModule,
    PromptsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
