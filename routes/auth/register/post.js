/**
 * @type {import('express').RequestHandler}
 */

import bcrypt from 'bcrypt'

import { generatesToken } from '@utils/jwt'
import { prisma } from '@database'

export default async (req, res) => {
  const { username, email, phoneNumber, dob, gender, password } = req.body
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
      dob,
      gender,
      password: hashPassword,
    },
  })

  if (registerUser) {
    const accessToken = generatesToken({
      id: registerUser.id,
      username,
      email,
    })

    res.status(200).send({
      message: 'Register success!',
      data: {
        username,
        email,
        accessToken,
      },
    })
  } else {
    res.status(400).send({ message: 'Register fail!' })
  }
}
