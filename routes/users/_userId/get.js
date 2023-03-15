/**
 * @type {import('express').RequestHandler}
 */
import { prisma } from '@database'

export default async (req, res) => {
  const { userId } = req.params

  const userFound = await prisma.user.findUnique({
    where: {
      id: +userId,
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

  if (!userFound) {
    return res.status(400).send({ message: 'User not found!' })
  }

  res.status(200).send({ message: 'Get single user success!', data: userFound })
}
