import { IsEnum, IsOptional, IsString } from 'class-validator'

import { AuthDTO } from './auth.dto'
import { Roles } from '../../../shared/enums/Roles.enum'

export class SignUpDTO extends AuthDTO {
  @IsOptional()
  @IsString()
  phone: string

  @IsOptional()
  @IsString()
  name: string

  @IsOptional()
  @IsEnum(Roles)
  role: string

  @IsOptional()
  @IsEnum(Roles)
  position: string
}
