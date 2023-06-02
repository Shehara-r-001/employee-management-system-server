import { Router } from 'express'

import users from './users/controllers'

const router = Router()

router.use('/users', users)

export default router
