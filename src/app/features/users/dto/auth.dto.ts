import { IsNotEmpty, IsString, MinLength, IsEmail } from 'class-validator'

export class AuthDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'password must be atleast 6 characters' })
  password: string
}
