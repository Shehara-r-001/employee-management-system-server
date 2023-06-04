import { CommonErrors } from '../enums/commonErrors.enum'
import { HttpCodes } from '../enums/httpCodes.enum'

// centralized error object that derives from Node’s Error
export class AppError extends Error {
  public readonly name: string
  public readonly httpCode: HttpCodes
  public readonly isOperational: boolean

  constructor(name: string, httpCode: HttpCodes, description: string) {
    super(description)

    Object.setPrototypeOf(this, new.target.prototype) // restore prototype chain

    this.name = name
    this.httpCode = httpCode

    Error.captureStackTrace(this)
  }
}
