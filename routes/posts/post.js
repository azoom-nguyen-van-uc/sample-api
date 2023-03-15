/**
 * @type {import('express').RequestHandler}
 */
import { prisma } from '@database'

export default async (req, res) => {
  try {
    const { title, body, authorId } = req.body

    const userFound = await prisma.user.findUnique({
      where: {
        id: +authorId,
      },
    })

    if (!userFound) {
      return res.status(400).send({ message: 'User not found!' })
    }

    const post = await prisma.post.create({
      data: {
        title,
        body,
        authorId,
      },
    })

    if (post) {
      res.status(200).send({ message: 'Create post success!' })
    }
  } catch (error) {
    res.status(400).send({ message: 'Create post failed!' })
  }
}
