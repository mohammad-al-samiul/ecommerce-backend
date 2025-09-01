import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsNotEmpty({ message: 'Username should not be a empty' })
  @IsString({ message: 'Username must be a string' })
  username: string;

  @IsEmail({}, { message: 'Please provide a valid email' })
  @IsNotEmpty({ message: 'Email should not be empty' })
  email: string;

  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password should not be empty' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  //   @IsOptional()
  //   @IsIn([Role.User, Role.Admin], { message: 'Role must be user or admin' })
  //   role?: Role = Role.User;
  @IsOptional()
  role?: string;
}
