/**
 * @type {import('express').RequestHandler}
 */
import { prisma } from '@database'

export default async (req, res) => {
  try {
    const { postId } = req.params
    const { title, body, authorId } = req.body

    const postFound = await prisma.post.findUnique({
      where: {
        id: +postId,
      },
    })

    if (!postFound) {
      return res.status(400).send({ message: 'Post not found!' })
    }

    const updatePost = await prisma.post.update({
      where: {
        id: +postId,
      },
      data: {
        title,
        body,
        authorId,
      },
    })

    if (updatePost) {
      res.status(200).send({ message: 'Update post success!' })
    }
  } catch (error) {
    res.status(400).send({ message: 'Update post failed!' })
  }
}
