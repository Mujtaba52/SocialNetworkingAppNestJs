import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Length, IsString } from 'class-validator';
export class UserSignUpDto {
  @ApiProperty()
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @Length(6)
  password: string;
}
