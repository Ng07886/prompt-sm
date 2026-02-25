import { Inject } from '@nestjs/common';
import { Firestore } from 'firebase-admin/firestore';

export class FriendsRepository {
  constructor(@Inject('FIRESTORE') private readonly db: Firestore) {}

  // Example: read 'users/{userId}/friends' subcollection, returning friend uids
  async getFriendsForUser(userId: string): Promise<string[]> {
    try {
      const colRef = this.db
        .collection('users')
        .doc(userId)
        .collection('friends');
      const snap = await colRef.get();
      return snap.docs.map((d) => d.id);
    } catch (err) {
      console.error('Error fetching friends for user', userId, err);
      // In real code, handle/log errors properly
      return [];
    }
  }
  // Add a friend by UID to the user's friends subcollection
  async addFriend(userId: string, friendId: string) {
    const ref = this.db
      .collection('users')
      .doc(userId)
      .collection('friends')
      .doc(friendId);
    await ref.set({ addedAt: new Date() }, { merge: true });
    return { success: true };
  }
}
