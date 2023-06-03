import { Router } from 'express'

import { dtoValidationMiddleware } from '../../../../core/middleware/dto-validation.middleware'
import { SignUpDTO } from '../../dto/signup.dto'
import { signUp } from './signup'

const router = Router()

router.post('/signup', dtoValidationMiddleware(SignUpDTO), signUp)

export default router
