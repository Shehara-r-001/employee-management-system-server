import { NextFunction, Request, Response } from 'express'

import { appResponse } from '../../shared/util/AppResponse'
import { AppError } from '../../shared/util/AppError'

export const errorFilter = (err: AppError, _req: Request, res: Response, _next: NextFunction) => {
  appResponse.error(res, err.httpCode, err.name, err.message)
}
