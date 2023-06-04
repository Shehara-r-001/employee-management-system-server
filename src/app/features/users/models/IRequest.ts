import { Request } from 'express'
import { IUser } from './User.model'

export interface IRequest extends Request {
  user?: Partial<IUser>
}
