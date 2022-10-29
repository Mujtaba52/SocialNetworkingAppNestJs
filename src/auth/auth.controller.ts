import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('sign_in')
  signIn(@Request() req) {
    return this.authService.generateToken(req.user);
  }
  @UseGuards(JwtAuthGuard)
  @Get('sign_out')
  signOut() {
    return 'signing out';
  }
}
