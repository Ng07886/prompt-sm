import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { NewsfeedService } from './newsfeed.service';
import { FirebaseAuthGuard } from '../../common/auth/firebase-auth.guard';

@Controller('newsfeed')
export class NewsfeedController {
  constructor(private readonly newsfeedService: NewsfeedService) {}

  // GET /newsfeed/feed?pageSize=20&before=timestamp
  @Get('feed')
  @UseGuards(FirebaseAuthGuard)
  async feed(
    @Req() req,
    @Query('pageSize') pageSize?: string,
    @Query('before') before?: string,
    @Query('date') date?: string,
  ) {
    const userId = req.user?.uid;
    const size = pageSize ? parseInt(pageSize, 10) : 30;
    // NOTE: before pagination is ignored for now; feed is "latest prompt".
    void before;
    const results = await this.newsfeedService.getFeedForUser({
      userId,
      pageSize: size,
      date,
    });
    return { data: results };
  }
}
