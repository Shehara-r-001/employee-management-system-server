import { NextFunction, Response } from 'express'

import { AppError } from '../../shared/util/AppError'
import { CommonErrors } from '../../shared/enums/commonErrors.enum'
import { HttpCodes } from '../../shared/enums/httpCodes.enum'
import { IRequest } from '../../features/users/models/IRequest'
import { Roles } from '../../shared/enums/Roles.enum'

export const rolesGuard = (roles: Roles[]) => {
  return (req: IRequest, _res: Response, next: NextFunction) => {
    try {
      const user = req.user

      if (!roles.includes(user?.role as Roles))
        throw new AppError(
          CommonErrors.FORBIDDEN_EXCEPTION,
          HttpCodes.FORBIDDEN,
          'You do not have required permission to execute the task'
        )

      next()
    } catch (error) {
      next(error)
    }
  }
}
