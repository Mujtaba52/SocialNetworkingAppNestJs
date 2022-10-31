import { Length } from 'class-validator';

export class createPostDto {
  @Length(10)
  description: string;
}
