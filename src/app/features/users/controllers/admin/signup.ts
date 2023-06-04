import { NextFunction, Request, Response } from 'express'
import { WithId } from 'mongodb'

import { db } from '../../../../core/config/mongodb.config'
import { SignUpDTO } from '../../dto/signup.dto'
import { encryptData } from '../../../../shared/util/bcrypt/encrypt-data'
import { appResponse } from '../../../../shared/util/AppResponse'
import { HttpCodes } from '../../../../shared/enums/httpCodes.enum'
import { Roles } from '../../../../shared/enums/Roles.enum'
import { convertTimeToIST } from '../../../../shared/util/toIST'
import { AppError } from '../../../../shared/util/AppError'
import { CommonErrors } from '../../../../shared/enums/commonErrors.enum'
import { jwtGenarator } from '../../../../shared/util/JWT/jwtGenerator'
import { IUser } from '../../models/User.model'

const usersCollection = db.collection<Partial<IUser>>('users')

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data: SignUpDTO = req.body

    const isUserExist = await usersCollection.findOne({
      email: data.email
    })

    if (isUserExist !== null)
      throw new AppError(CommonErrors.BAD_REQUEST_EXCEPTION, HttpCodes.BAD_REQUEST, 'user email already exist')

    const user = await usersCollection.insertOne({
      ...data,
      password: await encryptData(data.password),
      role: Roles.ADMIN,
      createdAt: convertTimeToIST(new Date()),
      updatedAt: undefined,
      active: true
    })

    const updatedUser = await usersCollection.findOne({
      _id: user.insertedId
    })

    if (updatedUser !== null) {
      const { password, ...rest } = updatedUser as WithId<IUser>

      const token = jwtGenarator(rest)
      appResponse.success(res, HttpCodes.CREATED, 'user has been created', token)
    }
  } catch (error) {
    next(error)
    throw error
  }
}
