import { Controller, Post, Body } from '@nestjs/common';
import { Get, Query } from '@nestjs/common';
import { PromptsService } from './prompts.service';

@Controller('prompts')
export class PromptsController {
  constructor(private readonly promptsService: PromptsService) {}

  // Admin endpoint: create/update prompt for a date
  @Post()
  async createPrompt(@Body() body: { date: string; question: string }) {
    return this.promptsService.createPrompt(body.date, body.question);
  }

  /**
   * GET /prompts/today?date=YYYY-MM-DD
   * Returns the prompt for the given date (defaults to today if not provided)
   */
  @Get('today')
  async getPromptOfTheDay(@Query('date') date?: string) {
    // Default to today if no date provided
    const today = date || new Date().toISOString().split('T')[0];
    return this.promptsService.getPromptByDate(today);
  }

  /**
   * GET /prompts/latest
   * Returns the single most recently created prompt.
   */
  @Get('latest')
  async getLatestPrompt() {
    return this.promptsService.getLatestPrompt();
  }
}
