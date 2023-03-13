/**
 * @type {import('express').RequestHandler}
 */
export default async (req, res) => {
  res.send({
    id: 0,
    username: 'string',
    email: 'user@example.com',
    phoneNumber: 'string',
    dob: '2019-08-24T14:15:22Z',
    gender: 'string',
    createdAt: '2019-08-24T14:15:22Z',
    updatedAt: '2019-08-24T14:15:22Z',
  })
}
