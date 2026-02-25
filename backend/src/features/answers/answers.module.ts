import { Module } from '@nestjs/common';
import { AnswersController } from './answers.controller';
import { AnswersService } from './answers.service';
import { AnswersRepository } from './answers.repository';
import { FirebaseModule } from '../../common/firebase/firebase.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [FirebaseModule, UsersModule],
  controllers: [AnswersController],
  providers: [AnswersService, AnswersRepository],
})
export class AnswersModule {}
