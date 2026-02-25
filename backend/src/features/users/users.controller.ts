import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { FirebaseAuthGuard } from '../../common/auth/firebase-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @UseGuards(FirebaseAuthGuard)
  async me(@Req() req) {
    const uid = req.user.uid;
    return this.usersService.getUser(uid);
  }

  @Post('register')
  @UseGuards(FirebaseAuthGuard)
  async register(
    @Req() req,
    @Body() payload: { displayName?: string; photoURL?: string },
  ) {
    const uid = req.user.uid;
    const userDoc = await this.usersService.registerUser(uid, payload);
    return userDoc;
  }
}
