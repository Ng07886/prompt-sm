import { UsersRepository } from '../users/users.repository';
import { Injectable } from '@nestjs/common';
import { FriendsRepository } from './friends.repository';

@Injectable()
export class FriendsService {
  constructor(
    private readonly repo: FriendsRepository,
    private readonly usersRepo: UsersRepository,
  ) {}

  // Business logic to list friends for a user. For now it delegates to repo.
  async listFriends(userId: string) {
    return this.repo.getFriendsForUser(userId);
  }

  // New: Get all friends with their stats
  async getFriendsWithStats(userId: string) {
    const friendUids = await this.repo.getFriendsForUser(userId);
    if (!friendUids.length) return [];
    // Batch in groups of 10 for Firestore 'in' query
    const chunks: string[][] = [];
    for (let i = 0; i < friendUids.length; i += 10) {
      chunks.push(friendUids.slice(i, i + 10));
    }
    const allFriendsData = [];
    for (const chunk of chunks) {
      const users = await this.usersRepo.getUsersByIds(chunk);
      allFriendsData.push(...users);
    }
    return allFriendsData;
  }

  // Add a friend by username
  async addFriendByUsername(userId: string, friendUsername: string) {
    // Look up the friend's user record by username
    const friend = await this.usersRepo.getUserByUsername(friendUsername);
    if (!friend) {
      throw new Error('User not found');
    }
    if (friend.id === userId) {
      throw new Error('Cannot add yourself as a friend');
    }
    // Add the friend relationship
    return this.repo.addFriend(userId, friend.id);
  }
}
