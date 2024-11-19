import { IsEmail, IsString } from "class-validator";

export class UserRegisterDto {
  @IsEmail({}, { message: 'Wrong email' })
  email!: string;

  @IsString({ message: 'Password should not be empty' })
  password!: string;

  @IsString({ message: 'Name is required' })
  name!: string;
}
