/**
 * @type {import('express').RequestHandler}
 */
import bcrypt from 'bcrypt'

import { prisma } from '@database'
import { generatesToken } from '@utils/jwt'

export default async (req, res) => {
  const { account, password } = req.body

  const user = await prisma.user.findFirst({
    where: {
      OR: [{ email: account }, { phoneNumber: account }],
    },
  })

  if (!user) {
    return res.status(400).send({ message: 'User not found' })
  }

  const comparePassword = await bcrypt.compare(password, user.password)

  if (!comparePassword) {
    return res.status(400).send({ message: 'Password incorrect!' })
  }

  res.status(200).send({
    message: 'Login success!',
    data: {
      username: user.username,
      email: user.email,
      phoneNumber: user.phoneNumber,
      accessToken: generatesToken({
        id: user.id,
        username: user.username,
        email: user.email,
      }),
    },
  })
}
