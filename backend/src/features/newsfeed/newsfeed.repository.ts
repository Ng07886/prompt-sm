import { Inject } from '@nestjs/common';
import { Firestore } from 'firebase-admin/firestore';

export class NewsfeedRepository {
  constructor(@Inject('FIRESTORE') private readonly db: Firestore) {}

  async getPromptById(promptId: string) {
    const doc = await this.db.collection('prompts').doc(promptId).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...(doc.data() as any) };
  }

  async getLatestPrompt() {
    const snap = await this.db
      .collection('prompts')
      .orderBy('createdAt', 'desc')
      .limit(1)
      .get();
    if (snap.empty) return null;
    const doc = snap.docs[0];
    return { id: doc.id, ...(doc.data() as any) };
  }

  async getAnswersForPromptByUserIds(promptId: string, userIds: string[]) {
    const answers: any[] = [];
    // Firestore doesn't support 'in' on documentId for subcollections without collectionGroup;
    // simplest approach: fetch docs directly.
    await Promise.all(
      userIds.map(async (uid) => {
        const snap = await this.db
          .collection('prompts')
          .doc(promptId)
          .collection('answers')
          .doc(uid)
          .get();
        if (snap.exists) answers.push({ id: snap.id, ...(snap.data() as any) });
      }),
    );
    return answers;
  }
}
