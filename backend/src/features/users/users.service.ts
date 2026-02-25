import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly repo: UsersRepository) {}

  getUser(uid: string) {
    return this.repo.getUser(uid);
  }

  async registerUser(
    uid: string,
    profile?: Partial<{ displayName: string; photoURL: string }>,
  ) {
    let authUser;
    try {
      authUser = await admin.auth().getUser(uid);
    } catch {
      authUser = null;
    }

    const now = admin.firestore.FieldValue.serverTimestamp();
    // Check if user already exists
    const existing = await this.repo.getUser(uid);
    const isFirstTime = !existing;
    const data = {
      displayName: profile?.displayName ?? authUser?.displayName ?? null,
      email: authUser?.email ?? null,
      username: authUser?.email ?? null, // Use email as username
      photoURL: profile?.photoURL ?? authUser?.photoURL ?? null,
      provider: authUser?.providerData?.[0]?.providerId ?? null,
      createdAt: existing?.createdAt ?? now,
      lastSeenAt: now,
      // Add streak fields if first time
      streak: isFirstTime ? 0 : (existing?.streak ?? 0),
      longestStreak: isFirstTime ? 0 : (existing?.longestStreak ?? 0),
      promptsCompleted: isFirstTime ? 0 : (existing?.promptsCompleted ?? 0),
      lastAnsweredPromptDate: isFirstTime
        ? null
        : (existing?.lastAnsweredPromptDate ?? null),
      lastPromptAnsweredAt: isFirstTime
        ? null
        : (existing?.lastPromptAnsweredAt ?? null),
      friendsCount: isFirstTime ? 0 : (existing?.friendsCount ?? 0),
      profileComplete: isFirstTime
        ? false
        : (existing?.profileComplete ?? false),
    };

    return this.repo.createOrUpdateUser(uid, data);
  }
}
