import { Response } from 'express'
import { HttpCodes } from '../enums/httpCodes.enum'

export class AppResponse {
  success<T>(response: Response, status: HttpCodes, message: string, payload?: T) {
    return response.status(status).json({
      success: true,
      message,
      data: payload
    })
  }
}

export const appResponse = new AppResponse()
