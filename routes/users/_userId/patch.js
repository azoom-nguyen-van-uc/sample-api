/**
 * @type {import('express').RequestHandler}
 */
import bcrypt from 'bcrypt'

import { prisma } from '@database'

export default async (req, res) => {
  try {
    const { userId } = req.params
    const { username, email, phoneNumber, dateOfBirth, gender, password } =
      req.body
    const hashPassword = password && (await bcrypt.hash(password, 10))

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ id: +userId }, { email }, { phoneNumber }],
      },
    })

    if (user) {
      if (user.email === email) {
        return res.status(400).send({ message: 'Email already exists!' })
      }
      if (user.phoneNumber === phoneNumber) {
        return res.status(400).send({ message: 'Phone number already exists!' })
      }
    } else {
      return res.status(400).send({ message: 'User not found!' })
    }

    const updateUser = await prisma.user.update({
      where: {
        id: +userId,
      },
      data: {
        username,
        email,
        phoneNumber,
        dateOfBirth,
        gender,
        password: hashPassword,
      },
    })

    if (updateUser) {
      res.status(200).send({ message: 'Update user success!' })
    }
  } catch (error) {
    res.status(400).send({ message: 'Update user failed!' })
  }
}
