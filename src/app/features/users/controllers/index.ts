import { Router } from 'express'

import auth from './auth'
import admins from './admin'

const router = Router()

router.use('/auth', auth)
router.use('/admin', admins)

export default router
