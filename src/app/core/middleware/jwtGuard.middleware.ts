import { NextFunction, Response } from 'express'
import * as jwt from 'jsonwebtoken'

import { AppError } from '../../shared/util/AppError'
import { CommonErrors } from '../../shared/enums/commonErrors.enum'
import { HttpCodes } from '../../shared/enums/httpCodes.enum'
import { JWT_SECRET } from '../constants/env.constants'
import { IRequest } from '../../features/users/models/IRequest'
import { IUser } from '../../features/users/models/User.model'

export const jwtGuard = (req: IRequest, _res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) throw new AppError(CommonErrors.UNAUTHORIZED_EXCEPTION, HttpCodes.UNAUTHORIZED, 'jwt token is missing')

    jwt.verify(token, JWT_SECRET, (error, decoded) => {
      if (error) throw new AppError(CommonErrors.UNAUTHORIZED_EXCEPTION, HttpCodes.UNAUTHORIZED, error.message)

      req.user = decoded as Partial<IUser>
      next()
    })
  } catch (error) {
    next(error)
  }
}
