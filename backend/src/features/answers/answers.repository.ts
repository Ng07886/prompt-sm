import { Injectable, Inject } from '@nestjs/common';
import { Firestore } from 'firebase-admin/firestore';

@Injectable()
export class AnswersRepository {
  constructor(@Inject('FIRESTORE') private readonly db: Firestore) {}

  async submitAnswer(
    userId: string,
    promptId: string,
    answer: string,
    profile?: { displayName?: string; photoURL?: string; username?: string },
  ) {
    const answerData = {
      userId,
      promptId,
      answer,
      displayName: profile?.displayName ?? null,
      photoURL: profile?.photoURL ?? null,
      username: profile?.username ?? null,
      createdAt: new Date(),
    };

    // Prompt-centric answers:
    // prompts/{promptId}/answers/{userId}
    await this.db
      .collection('prompts')
      .doc(promptId)
      .collection('answers')
      .doc(userId)
      .set(answerData);

    // User index (for profile/history/screens)
    await this.db
      .collection('users')
      .doc(userId)
      .collection('answers')
      .doc(promptId)
      .set(answerData);

    return answerData;
  }
}
