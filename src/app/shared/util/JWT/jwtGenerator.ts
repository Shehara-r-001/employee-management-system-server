import * as jwt from 'jsonwebtoken'

import { JWT_SECRET } from '../../../core/constants/env.constants'

export const jwtGenarator = (data: string | object | Buffer): string => {
  return jwt.sign(data, JWT_SECRET, { expiresIn: '2d' })
}
