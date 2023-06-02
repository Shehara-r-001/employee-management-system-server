import { MongoClient, Db } from 'mongodb'

import { DATABASE_CONNECTION_STRING, DATABASE_NAME } from '../constants/env.constants'

export class MongoDBConnection {
  connect = async (): Promise<Db> => {
    console.info('Connecting MongoDB...')
    try {
      const client = new MongoClient(DATABASE_CONNECTION_STRING).connect()

      const database = (await client).db(DATABASE_NAME, {
        ignoreUndefined: true
      })

      console.info('MongoDB connected Successfully')
      return database
    } catch (error) {
      console.error('Failed to connect MongoDB')
      throw error
    }
  }

  getDatabase = async (): Promise<Db> => {
    return this.connect()
  }
}
