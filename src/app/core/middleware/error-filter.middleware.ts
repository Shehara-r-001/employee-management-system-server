import { NextFunction, Request, Response } from 'express'

import { appResponse } from '../../shared/util/AppResponse'
import { AppError } from '../../shared/util/AppError'
import { CommonErrors } from '../../shared/enums/commonErrors.enum'

export const errorFilter = (err: AppError | any, _req: Request, res: Response, _next: NextFunction) => {
  appResponse.error(
    res,
    typeof err === typeof AppError ? err.httpCode : 500,
    typeof err === typeof AppError ? err.name : CommonErrors.INTERNAL_SERVER_ERROR,
    err.message
  )
}
