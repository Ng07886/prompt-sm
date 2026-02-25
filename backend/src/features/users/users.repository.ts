import { Injectable, Inject } from '@nestjs/common';
import { Firestore } from 'firebase-admin/firestore';
import * as admin from 'firebase-admin';

@Injectable()
export class UsersRepository {
  constructor(@Inject('FIRESTORE') private readonly db: Firestore) {}

  async getUser(uid: string) {
    const doc = await this.db.collection('users').doc(uid).get();
    return doc.exists ? { id: doc.id, ...(doc.data() as any) } : null;
  }

  async createOrUpdateUser(uid: string, data: Record<string, any>) {
    const ref = this.db.collection('users').doc(uid);
    await ref.set(data, { merge: true });
    const snap = await ref.get();
    return { id: snap.id, ...(snap.data() as any) };
  }

  // Batch get users by array of UIDs (max 10 per call)
  async getUsersByIds(uids: string[]): Promise<any[]> {
    if (!uids.length) return [];
    const snap = await this.db
      .collection('users')
      .where(admin.firestore.FieldPath.documentId(), 'in', uids)
      .get();
    return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }
  // Get user by username (unique)
  async getUserByUsername(username: string): Promise<any | null> {
    const snap = await this.db
      .collection('users')
      .where('username', '==', username)
      .limit(1)
      .get();
    if (snap.empty) return null;
    const doc = snap.docs[0];
    return { id: doc.id, ...doc.data() };
  }
}
