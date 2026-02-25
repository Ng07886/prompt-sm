import { Injectable } from '@nestjs/common';
import { NewsfeedRepository } from './newsfeed.repository';
import { FriendsService } from '../friends/friends.service';

@Injectable()
export class NewsfeedService {
  constructor(
    private readonly repo: NewsfeedRepository,
    private readonly friendsService: FriendsService,
  ) {}

  // Simple feed for now: friends' answers to the single latest prompt.
  async getFeedForUser(args: {
    userId: string;
    pageSize?: number;
    /** Calendar date (YYYY-MM-DD). If omitted, uses latest prompt. */
    date?: string;
  }) {
    const { userId, pageSize = 30, date } = args;
    const friendIds = await this.friendsService.listFriends(userId);
    if (!friendIds || friendIds.length === 0) return [];

    const prompt = date
      ? await this.repo.getPromptById(date)
      : await this.repo.getLatestPrompt();
    if (!prompt?.id) return [];

    const answers = await this.repo.getAnswersForPromptByUserIds(
      prompt.id,
      friendIds,
    );

    // Join minimal prompt info for UI.
    const enriched = answers.map((a) => ({
      ...a,
      promptId: prompt.id,
      question: prompt.question,
      promptCreatedAt: prompt.createdAt,
    }));

    enriched.sort(
      (a, b) =>
        (b.createdAt?.toMillis?.() ?? new Date(b.createdAt).getTime()) -
        (a.createdAt?.toMillis?.() ?? new Date(a.createdAt).getTime()),
    );

    return enriched.slice(0, pageSize);
  }
}
