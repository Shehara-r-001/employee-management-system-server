import { Router } from 'express'

import { dtoValidationMiddleware } from '../../../../core/middleware/dto-validation.middleware'
import { SignUpDTO } from '../../dto/signup.dto'
import { signUp } from './signup'
import { jwtGuard } from '../../../../core/middleware/jwtGuard.middleware'
import { rolesGuard } from '../../../../core/middleware/rolesGuard'
import { Roles } from '../../../../shared/enums/Roles.enum'
import { createUser } from './create-user'

const router = Router()

router.post('/signup', dtoValidationMiddleware(SignUpDTO), signUp)
router.post('/user', jwtGuard, rolesGuard([Roles.ADMIN]), createUser)

export default router
