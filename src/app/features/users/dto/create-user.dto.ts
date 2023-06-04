import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator'
import { Roles } from '../../../shared/enums/Roles.enum'

export class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'password must be atleast 6 characters' })
  password: string

  @IsNotEmpty()
  @IsEnum(Roles)
  role: Roles

  @IsOptional()
  @IsString()
  position: string
}
