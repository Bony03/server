import authModel from './authModel.js'
import bcrypt from 'bcryptjs'

class authController {
  async create(req, res) {
    try {
      const { email, password } = req.body
      const salt = bcrypt.genSaltSync(10)
      console.log(salt)
      const hashedPassword = bcrypt.hashSync(password, salt)
      console.log(hashedPassword)
      const user = await authModel.create({ email, hashedPassword })
      res.json(user)
    } catch (e) {
      if (e.code === 11000) {
        res.json('Пользователь с таким email уже существует')
      } else {
        console.log(e)
      }
    }
  }
  async login(req, res) {
    try {
      const { email, password } = req.body
      const user = await authModel.find({ email })
      await bcrypt.compare(password, user[0].hashedPassword, (err, result) => {
        if (result) {
          res.json('Пользователь успешно зарегистрирован!')
        } else {
          res.json('Лох')
        }
      })
    } catch (e) {
      console.log(e)
    }
  }
}

export default new authController()
