import { Injectable } from '@nestjs/common';
import { AnswersRepository } from './answers.repository';
import { UsersRepository } from '../users/users.repository';
import * as admin from 'firebase-admin';

@Injectable()
export class AnswersService {
  constructor(
    private readonly repo: AnswersRepository,
    private readonly usersRepo: UsersRepository,
  ) {}

  async submitAnswer(
    userId: string,
    answer: string,
    promptId: string,
    profile?: { displayName?: string; photoURL?: string; username?: string },
  ) {
    // Get user doc
    const user = await this.usersRepo.getUser(userId);
    // Calculate streak logic
    // For now promptId is the date (YYYY-MM-DD). Later, use prompt.date.
    const today = promptId;
    let streak = 1;
    let longestStreak = user?.longestStreak ?? 0;
    const promptsCompleted = (user?.promptsCompleted ?? 0) + 1;
    const lastAnsweredPromptDate = today;
    if (user?.lastAnsweredPromptDate) {
      const prev = user.lastAnsweredPromptDate;
      // If previous answer was yesterday, increment streak
      const prevDate = new Date(prev);
      const todayDate = new Date(today);
      const diff =
        (todayDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24);
      if (diff === 1) {
        streak = (user.streak ?? 0) + 1; // answered previous day, increment streak
      } else if (diff === 0) {
        streak = user.streak ?? 1; // already answered today
      } else {
        streak = 1; // missed a day, reset streak
      }
    }
    if (streak > longestStreak) longestStreak = streak;
    // Update user doc
    await this.usersRepo.createOrUpdateUser(userId, {
      streak,
      longestStreak,
      promptsCompleted,
      lastAnsweredPromptDate,
      lastPromptAnsweredAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    // Write answer
    return this.repo.submitAnswer(userId, promptId, answer, profile);
  }
}
