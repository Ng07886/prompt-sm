import { Injectable } from '@nestjs/common';
import { PromptsRepository } from './prompts.repository';

@Injectable()
export class PromptsService {
  constructor(private readonly repo: PromptsRepository) {}

  async createPrompt(date: string, question: string) {
    return this.repo.createOrUpdatePrompt(date, question);
  }

  async getPromptByDate(date: string) {
    return this.repo.getPromptByDate(date);
  }

  async getLatestPrompt() {
    return this.repo.getLatestPrompt();
  }
}
