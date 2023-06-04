import { NextFunction, Request, Response } from 'express'
import * as bcrypt from 'bcryptjs'

import { appResponse } from '../../../../shared/util/AppResponse'
import { HttpCodes } from '../../../../shared/enums/httpCodes.enum'
import { db } from '../../../../core/config/mongodb.config'
import { AuthDTO } from '../../dto/auth.dto'
import { AppError } from '../../../../shared/util/AppError'
import { CommonErrors } from '../../../../shared/enums/commonErrors.enum'
import { WithId } from 'mongodb'
import { IUser } from '../../models/User.model'
import { jwtGenarator } from '../../../../shared/util/JWT/jwtGenerator'

const usersCollection = db.collection<Partial<IUser>>('users')

export const signIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data: AuthDTO = req.body
    const isExist = await usersCollection.findOne({
      email: data.email
    })

    if (!isExist) throw new AppError(CommonErrors.NOT_FOUND_EXCEPTION, HttpCodes.NOT_FOUND, 'user email does not exist')

    const user = isExist as WithId<IUser>

    const isMatch = await bcrypt.compare(data.password, isExist.password as string)
    if (!isMatch)
      throw new AppError(
        CommonErrors.UNAUTHORIZED_EXCEPTION,
        HttpCodes.UNAUTHORIZED,
        'email and password does not match'
      )

    const { password, ...rest } = user
    const token = jwtGenarator(rest)
    return appResponse.success(res, HttpCodes.OK, 'Signed in successfully', token)
  } catch (error) {
    next(error)
    throw error
  }
}
