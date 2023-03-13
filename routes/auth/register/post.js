/**
 * @type {import('express').RequestHandler}
 */

import bcrypt from 'bcrypt'

import { generatesToken } from '@utils/jwt'
import { prisma } from '@database'

export default async (req, res) => {
  const user = {
    ...req.body,
    password: await bcrypt.hash(req.body.password, 10),
  }

  const userByEmail = await prisma.users.findUnique({
    where: {
      email: user.email,
    },
  })
  const userByPhoneNumber = await prisma.users.findUnique({
    where: {
      phoneNumber: user.phoneNumber,
    },
  })

  if (userByEmail) {
    res.status(400).send('Email already exists!')
  }

  if (userByPhoneNumber) {
    res.status(400).send('Phone number already exists')
  }

  // const registerUser = await prisma.user.create({
  //   data: user,
  // })
  // console.log(registerUser)
  res.status(200).send('Register success!')
}
