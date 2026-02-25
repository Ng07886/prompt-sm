import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { FirebaseAuthGuard } from '../../common/auth/firebase-auth.guard';

@Controller('friends')
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  // GET /friends/list - returns an array of friend UIDs or friend records
  @Get('list')
  @UseGuards(FirebaseAuthGuard)
  async list(@Req() req) {
    const userId = req.user?.uid;
    return this.friendsService.listFriends(userId);
  }

  // POST /friends/add - add a friend by username
  @Post('add')
  @UseGuards(FirebaseAuthGuard)
  async addFriend(@Req() req, @Body() body: { username: string }) {
    const userId = req.user?.uid;
    const { username } = body;
    return this.friendsService.addFriendByUsername(userId, username);
  }

  // GET /friends/with-stats - returns all friends with their stats
  @Get('with-stats')
  @UseGuards(FirebaseAuthGuard)
  async withStats(@Req() req) {
    const userId = req.user?.uid;
    return this.friendsService.getFriendsWithStats(userId);
  }
}
