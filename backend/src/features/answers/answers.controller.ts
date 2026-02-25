import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { FirebaseAuthGuard } from '../../common/auth/firebase-auth.guard';

@Controller('answers')
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @Post('submit')
  @UseGuards(FirebaseAuthGuard)
  async submit(
    @Req() req,
    @Body()
    body: {
      promptId: string;
      answer: string;
      displayName?: string;
      photoURL?: string;
      username?: string;
    },
  ) {
    const userId = req.user.uid;
    return this.answersService.submitAnswer(
      userId,
      body.answer,
      body.promptId,
      {
        displayName: body.displayName,
        photoURL: body.photoURL,
        username: body.username,
      },
    );
  }
}
