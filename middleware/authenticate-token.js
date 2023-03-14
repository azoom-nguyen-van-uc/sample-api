import jwt from 'jsonwebtoken'

export default (req, res, next) => {
  const { token } = req

  if (token == null) return res.status(401).send({ message: 'Unauthorized' })

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).send({ message: 'Forbidden' })

    req.user = user

    next()
  })
}
