import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserService } from './user.service';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { UserSignUpDto } from './dto/user-signup.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiBody({})
  @Post('signup')
  async signup(@Body() body: UserSignUpDto) {
    const data = await this.userService.signup(body);
    return data;
  }

  @UseGuards(JwtAuthGuard)
  @Get('')
  async getUsers(@Query('page') page: string, @Query('limit') limit: string) {
    // you can also take the query as a whole and decontruct it
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
  @UseGuards(JwtAuthGuard)
  @Post(':id/unfollow')
  async unfollowUser(@Param('id') id: string) {
    const userUnfollowed = this.userService.unfollowUser(id);
    return userUnfollowed;
  }
  @UseGuards(JwtAuthGuard)
  @Patch('')
  async updateUser(@Request() req: any) {
    const userUpdated = this.userService.updateUser(req.user._id, req.body);
    return userUpdated;
  }
  @UseGuards(JwtAuthGuard)
  @Delete('')
  async deleteUser(@Request() req: any) {
    const userUpdated = this.userService.deleteUser(req.user._id);
    return userUpdated;
  }
}
