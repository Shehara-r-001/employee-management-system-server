import express from 'express'
import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUI from 'swagger-ui-express'
import helmet from 'helmet'
import responseTime from 'response-time'
import cors from 'cors'
import morgan from 'morgan'
import { Joi } from 'celebrate'
import moment from 'moment'
import 'dotenv/config'
import { BASE_URL, NODE_ENVIRONMENT, PORT } from './app/core/constants/env.constants'
import api from './app/features'
import { MongoDBConnection } from './app/core/config/mongodb.config'

const launch = () => {
  const envSchema = Joi.object({
    PORT: Joi.number().required(),
    BASE_URL: Joi.string().required(),
    DATABASE_CONNECTION_STRING: Joi.string().required(),
    DATABASE_NAME: Joi.string().required(),
    JWT_SECRET: Joi.string().required()
  })

  const validationResult = envSchema.unknown().validate(process.env)

  if (validationResult.error) throw new Error(validationResult.error.message)

  const app = express()

  const swaggerConfig = swaggerJsDoc({
    swaggerDefinition: {
      info: {
        title: 'HRMS API',
        version: '1.0.0',
        description: 'API documentation for HRMS backend'
      }
    },
    apis: ['./src/app/features/**/*.ts']
  })

  app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerConfig))

  app.use(helmet())
  app.use(responseTime())

  app.use(
    cors({
      origin: true,
      exposedHeaders: ['X-Response-Time']
    })
  )

  app.use(
    express.json({
      limit: '1mb'
    })
  )

  app.use(morgan(':method :url => status - :status, took :response-time ms.'))

  app.use('/api', api)

  const mongoDbConnection = new MongoDBConnection()
  mongoDbConnection.connect().catch(e => {
    console.error('Failed to connect MongoDB')
    throw e
  })

  app.listen(PORT, () => {
    console.log(`Successfully started the server at ${moment().format('MMM DD, YYYY - hh:mm A on Z')}`)
    console.info(`Environment: ${NODE_ENVIRONMENT}`)
    console.info(`Base URL: ${BASE_URL}`)
    console.info(`Swagger docs at: ${BASE_URL}/docs`)
  })
}

try {
  launch()
} catch (error) {
  console.warn('Failed to start the server')
  console.error(error)
}
// TODO express-jwt-blacklist
// TODO logout endpoint
