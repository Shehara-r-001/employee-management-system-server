import { NextFunction, Request, Response } from 'express'
import { ObjectId } from 'mongodb'

import { CreateUserDTO } from '../../dto/create-user.dto'
import { db } from '../../../../core/config/mongodb.config'
import { IUser } from '../../models/User.model'
import { IRequest } from '../../models/IRequest'
import { convertTimeToIST } from '../../../../shared/util/toIST'
import { appResponse } from '../../../../shared/util/AppResponse'
import { HttpCodes } from '../../../../shared/enums/httpCodes.enum'

const usersCollection = db.collection<Partial<IUser>>('users')

export const createUser = async (req: IRequest, res: Response, next: NextFunction) => {
  try {
    const data: CreateUserDTO = req.body
    const user = req.user

    const createdUser = await usersCollection.insertOne({
      ...data,
      createdAt: convertTimeToIST(new Date()),
      active: true,
      createdBy: new ObjectId(user?._id)
    })

    appResponse.success(res, HttpCodes.CREATED, `user has been created`, createdUser)
  } catch (error) {
    next(error)
    throw error
  }
}
