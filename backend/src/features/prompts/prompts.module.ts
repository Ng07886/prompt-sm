import { Module } from '@nestjs/common';
import { PromptsController } from './prompts.controller';
import { PromptsService } from './prompts.service';
import { PromptsRepository } from './prompts.repository';
import { FirebaseModule } from '../../common/firebase/firebase.module';

@Module({
  imports: [FirebaseModule],
  controllers: [PromptsController],
  providers: [PromptsService, PromptsRepository],
  exports: [PromptsService, PromptsRepository],
})
export class PromptsModule {}
