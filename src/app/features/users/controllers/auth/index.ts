import { Router } from 'express'
import { signIn } from './signIn'

const router = Router()

router.post('/signin', signIn)

export default router
