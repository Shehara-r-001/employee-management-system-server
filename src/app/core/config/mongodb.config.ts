import { MongoClient, ServerApiVersion } from 'mongodb'

import { DATABASE_CONNECTION_STRING, DATABASE_NAME } from '../constants/env.constants'

const client = new MongoClient(DATABASE_CONNECTION_STRING, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

export const connectDB = async () => {
  try {
    await client.connect()

    console.log('MongoDB has been connected successfully.')
  } catch (error) {
    throw error
  }
}

export const disconnectDB = () => {
  try {
    client.close()
  } catch (error) {
    throw error
  }
}

export const db = client.db(DATABASE_NAME)
