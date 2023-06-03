import * as jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../../../core/constants/env.constants'
import { AppResponse } from '../AppResponse'
import { AppError } from '../AppError'
import { CommonErrors } from '../../enums/commonErrors.enum'
import { HttpCodes } from '../../enums/httpCodes.enum'

export const jwtDecoder = (token: string): jwt.JwtPayload | string => {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    throw new AppError(CommonErrors.UNAUTHORIZED_EXCEPTION, HttpCodes.UNAUTHORIZED, (error as Error).message)
  }
}
