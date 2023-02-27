import authModel from './authModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { DEF } from './default.js'
class authController {
  async register(req, res) {
    try {
      const { email, password } = req.body
      const candidate = await authModel.findOne({ email })
      if (candidate) {
        return res.json({ message: 'Пользователь уже зарегистрирован' })
      }
      const salt = bcrypt.genSaltSync(10)
      const hashedPassword = bcrypt.hashSync(password, salt)
      const user = await authModel.create({ email, password: hashedPassword })
      res.json(user)
    } catch (e) {
      console.log(e)
    }
  }
  async login(req, res) {
    try {
      const { email, password } = req.body

      const user = await authModel.findOne({ email })

      if (!user) {
        return res.json({ message: 'Пользователь не найден' })
      }

      await bcrypt.compare(password, user.password, (err, result) => {
        if (!result) {
          return res.json('Пароль не правильный!')
        }
        const token = jwt.sign({ id: user._id }, DEF.SECRET_KEY, {
          expiresIn: '24h',
        })
        return res.json({
          token,
          user: {
            email,
            id: user._id,
          },
        })
      })
    } catch (e) {
      console.log(e)
    }
  }
}

export default new authController()
