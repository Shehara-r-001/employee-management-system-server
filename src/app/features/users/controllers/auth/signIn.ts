import { NextFunction, Request, Response } from 'express'

import { appResponse } from '../../../../shared/util/AppResponse'
import { HttpCodes } from '../../../../shared/enums/httpCodes.enum'
import { errorFilter } from '../../../../core/middleware/error-filter.middleware'

export const signIn = (req: Request, res: Response, next: NextFunction) => {
  try {
    return appResponse.success(res, HttpCodes.OK, 'Signed in successfully', req.body)
  } catch (error) {
    // return appResponse.error(res, HttpCodes.BAD_REQUEST, '')
    throw error
  }
}
