/**
 * @type {import('express').RequestHandler}
 */
import { prisma } from '@database'

export default async (req, res) => {
  try {
    const { userId } = req.params

    const userFound = await prisma.user.findUnique({
      where: {
        id: +userId,
      },
    })

    if (!userFound) {
      return res.status(400).send({ message: 'User not found!' })
    }

    const deleteUser = await prisma.user.update({
      where: {
        id: +userId,
      },
      data: {
        deleted: true,
      },
    })

    if (deleteUser) {
      res.status(200).send({ message: 'Delete user success' })
    }
  } catch (error) {
    res.status(400).send({ message: 'Delete user failed!' })
  }
}
