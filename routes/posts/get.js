/**
 * @type {import('express').RequestHandler}
 */
import { prisma } from '@database'

export default async (req, res) => {
  const posts = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      body: true,
      user: {
        select: {
          username: true,
          email: true,
        },
      },
    },
  })

  if (posts.length > 0) {
    return res.status(200).send({ message: 'Get all post success', data: post })
  }
  res.status(200).send({ message: 'Post is empty' })
}
