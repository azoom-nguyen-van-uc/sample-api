import jwt from 'jsonwebtoken'

import { prisma } from '@database'

export default (req, res, next) => {
  const { token } = req

  if (token == null) return res.status(401).send({ message: 'Unauthorized' })

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(403).send({ message: 'Forbidden' })

    const userFound = await prisma.user.findUnique({
      where: {
        id: +user.id,
      },
    })

    if (!userFound) return res.status(404).send({ message: 'User not found' })

    req.user = user

    next()
  })
}
