/**
 * @type {import('express').RequestHandler}
 */
import { prisma } from '@database'

export default async (req, res) => {
  const users = await prisma.user.findMany({
    where: {
      deleted: false,
    },
    select: {
      id: true,
      username: true,
      email: true,
      phoneNumber: true,
      dateOfBirth: true,
      gender: true,
    },
  })

  if (users.length > 0) {
    return res
      .status(200)
      .send({ message: 'Get all user success', data: users })
  }
  res.status(200).send({ message: 'User is empty' })
}
