import { ObjectId } from 'mongodb'
import { Roles } from '../../../shared/enums/Roles.enum'

export interface IUser {
  _id: string
  name: string | undefined
  email: string
  password: string
  role: Roles
  position: string
  createdBy: ObjectId
  createdAt: Date | string
  updatedAt: Date | string | undefined
  active: boolean
}
