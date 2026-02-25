import { Injectable, Inject } from '@nestjs/common';
import { Firestore } from 'firebase-admin/firestore';

@Injectable()
export class PromptsRepository {
  constructor(@Inject('FIRESTORE') private readonly db: Firestore) {}

  async createOrUpdatePrompt(date: string, question: string) {
    const promptData = {
      question,
      createdAt: new Date(),
    };
    await this.db
      .collection('prompts')
      .doc(date)
      .set(promptData, { merge: true });
    return promptData;
  }

  async getPromptByDate(date: string) {
    const doc = await this.db.collection('prompts').doc(date).get();
    if (!doc.exists) {
      return null;
    }
    return doc.data();
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
}
