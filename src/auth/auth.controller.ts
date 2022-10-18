import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('sign_in')
  signIn(@Body('email') email: string, @Body('password') password: string) {
    return this.authService.siginIn(email, password);
  }
  @Post('sign_out')
  signOut() {
    return 'signing out';
  }
}
