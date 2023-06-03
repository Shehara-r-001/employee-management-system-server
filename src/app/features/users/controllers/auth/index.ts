import { Router } from 'express'

import { signIn } from './signIn'
import { dtoValidationMiddleware } from '../../../../core/middleware/dto-validation.middleware'
import { AuthDTO } from '../../dto/auth.dto'

const router = Router()

router.post('/signin', dtoValidationMiddleware(AuthDTO), signIn)

export default router
