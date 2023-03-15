/**
 * @type {import('express').RequestHandler}
 */
import { prisma } from '@database'

export default async (req, res) => {
  const { postId } = req.params

  const postFound = await prisma.post.findUnique({
    where: {
      id: +postId,
    },
  })

  if (!postFound) {
    return res.status(400).send({ message: 'Post not found!' })
  }

  res.status(200).send({ message: 'Get single post success!', data: postFound })
}
