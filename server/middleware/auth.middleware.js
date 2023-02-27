import jwt from 'jsonwebtoken'
import DEF from '../default'

export default function (req, res, next) {
  if (req.method === 'OPTIONS') {
    return next()
  }
  try {
    const token = req.token.authorization.split(' ')[1]
    if (!token) {
      return res.status(401).json({ message: 'Auth error' })
    }
    const decode = jwt.verify(token, DEF.SECRET_KEY)
    req.user = decode
    next()
  } catch (e) {
    return res.status(401).json({ message: 'Auth error' })
  }
}
