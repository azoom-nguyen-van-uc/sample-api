/**
 * @type {import('express').RequestHandler}
 */
import { prisma } from '@database'

export default async (req, res) => {
  try {
    const { postId } = req.params

    const postFound = await prisma.post.findUnique({
      where: {
        id: +postId,
      },
    })

    if (!postFound) {
      return res.status(400).send({ message: 'Post not found!' })
    }

    const deletePost = await prisma.post.delete({
      where: {
        id: +postId,
      },
    })

    if (deletePost) {
      res.status(200).send({ message: 'Delete post success' })
    }
  } catch (error) {
    res.status(400).send({ message: 'Delete post failed!' })
  }
}
