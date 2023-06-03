import { Node_Environments } from '../../shared/enums/environments.enum'

const env = process.env

export const PORT = env.PORT as string

export const BASE_URL = env.BASE_URL as string

export const NODE_ENVIRONMENT: Node_Environments = env.NODE_ENV as Node_Environments

export const DATABASE_CONNECTION_STRING = env.DATABASE_CONNECTION_STRING as string

export const DATABASE_NAME = env.DATABASE_NAME as string

export const JWT_SECRET = env.JWT_SECRET as string

export const TZ_OFFSET = env.TZ_OFFSET as string

export const TZ = env.TZ as string
