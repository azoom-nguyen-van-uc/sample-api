/**
 * @type {import('express').RequestHandler}
 */

import bcrypt from 'bcrypt'

import { prisma } from '@database'

export default async (req, res) => {
  try {
    const { username, email, phoneNumber, dateOfBirth, gender, password } =
      req.body
    const hashPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { phoneNumber }],
      },
    })

    if (user) {
      if (user.email === email) {
        return res.status(400).send('Email already exists!')
      }
      if (user.phoneNumber === phoneNumber) {
        return res.status(400).send('Phone number already exists')
      }
    }

    const registerUser = await prisma.user.create({
      data: {
        username,
        email,
        phoneNumber,
        dateOfBirth,
        gender,
        password: hashPassword,
      },
    })

    if (registerUser) {
      res.status(200).send({
        message: 'Created user success!',
      })
    }
  } catch (error) {
    res.status(400).send({ message: 'Create user failed!' })
  }
}
