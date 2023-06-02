import { plainToInstance } from 'class-transformer'
import { ValidationError, validate } from 'class-validator'
import { RequestHandler, Request, Response, NextFunction } from 'express'

import { AppError } from '../../shared/util/AppError'
import { CommonErrors } from '../../shared/enums/commonErrors.enum'
import { HttpCodes } from '../../shared/enums/httpCodes.enum'

export const dtoValidationMiddleware = (type: any, skipMissingProperties = false): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    const dtoObj = plainToInstance(type, req.body)

    validate(dtoObj, { skipMissingProperties }).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        const dtoErrors = errors.map((error: ValidationError) => (Object as any).values(error.constraints)).join(', ')

        next(new AppError(CommonErrors.BAD_REQUEST_EXCEPTION, HttpCodes.BAD_REQUEST, dtoErrors))
      } else {
        req.body = dtoObj
        next()
      }
    })
  }
}
