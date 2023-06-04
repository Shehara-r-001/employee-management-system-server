import { Router } from 'express'

import auth from './auth'
import admins from './admin'
import employees from './employees'

const router = Router()

router.use('/auth', auth)
router.use('/admin', admins)
router.use('/employees', employees)

export default router
