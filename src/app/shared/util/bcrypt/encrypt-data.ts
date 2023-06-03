import * as bcrypt from 'bcryptjs'

export const encryptData = async (data: string) => {
  const rounds = 10

  const hashedData = await bcrypt.hash(data, rounds)

  return hashedData
}
