import { Module } from '@nestjs/common';
import { NewsfeedController } from './newsfeed.controller';
import { NewsfeedService } from './newsfeed.service';
import { NewsfeedRepository } from './newsfeed.repository';
import { FriendsModule } from '../friends/friends.module';
import { FirebaseModule } from '../../common/firebase/firebase.module';
import { PromptsModule } from '../prompts/prompts.module';

@Module({
  imports: [FriendsModule, PromptsModule, FirebaseModule],
  controllers: [NewsfeedController],
  providers: [NewsfeedService, NewsfeedRepository],
})
export class NewsfeedModule {}
