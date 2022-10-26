import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('signin')
  signin() {
    return this.userService.signin();
  }
  @Post('signup')
  async signup(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const data = await this.userService.signup(name, email, password);
    return data;
  }
  @UseGuards(JwtAuthGuard)
  @Get('')
  async getUsers(@Query('page') page: string, @Query('limit') limit: string) {
    const users = await this.userService.getUsers(
      parseInt(page) || 1,
      parseInt(limit) || 5,
    );
    return users;
  }
  @Get(':id')
  async getUser(@Param('id') id: string) {
    const users = await this.userService.getUser(id);
    return users;
  }
  @Post(':id/follow')
  async followUser(@Param('id') id: string) {
    const userFollowed = await this.userService.followUser(id);
    return userFollowed;
  }
  @Post(':id/unfollow')
  async unfollowUser(@Param('id') id: string) {
    const userUnfollowed = this.userService.unfollowUser(id);
    return userUnfollowed;
  }
}
