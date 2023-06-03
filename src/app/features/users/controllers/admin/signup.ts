import { NextFunction, Request, Response } from 'express'

import { db } from '../../../../core/config/mongodb.config'
import { SignUpDTO } from '../../dto/signup.dto'
import { encryptData } from '../../../../shared/util/bcrypt/encrypt-data'
import { appResponse } from '../../../../shared/util/AppResponse'
import { HttpCodes } from '../../../../shared/enums/httpCodes.enum'
import { Roles } from '../../../../shared/enums/Roles.enum'
import { convertTimeToIST } from '../../../../shared/util/toIST'

const usersCollection = db.collection('users')

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data: SignUpDTO = req.body
    const user = await usersCollection.insertOne({
      ...data,
      password: await encryptData(data.password),
      role: Roles.ADMIN,
      createdAt: convertTimeToIST(new Date())
    })

    return appResponse.success(res, HttpCodes.CREATED, 'user has been created', user)
  } catch (error) {
    throw error
  }
}
