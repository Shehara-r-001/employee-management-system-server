import { Roles } from '../../../shared/enums/Roles.enum'

export interface IUser {
  _id: string
  name: string | undefined
  email: string
  password: string
  role: Roles
  position: string
  createdAt: Date | string
  updatedAt: Date | string | undefined
}
