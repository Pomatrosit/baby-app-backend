import validator from "validator"
import db from "../db.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const generateAccessToken = (id, name) => {
  const payload = {
    id,
    name,
  }
  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1h" })
}

class AuthController {
  async register(req, res) {
    try {
      const { name, login, password } = req.body

      // Валидация
      const validationErrors = []
      if (!validator.isLength(String(name), { min: 2, max: 30 }))
        validationErrors.push("Длина имени должна быть от 2 до 30 символов")
      if (!validator.isLength(String(login), { min: 2, max: 30 }))
        validationErrors.push("Длина логина должна быть от 2 до 30 символов")
      if (!validator.isLength(String(password), { min: 8 }))
        validationErrors.push("Минимальная длина пароля - 8 символов")
      if (validationErrors.length > 0)
        return res.status(400).json({
          err: true,
          message: "Ошибка валидации",
          data: validationErrors,
        })

      // Проверка на уникальность логина
      const candidate = await db.query(
        `SELECT * FROM users WHERE login='${login}'`
      )
      if (candidate.rows.length > 0)
        return res.status(400).json({
          err: true,
          message: "Пользователь с таким логином уже существует",
        })

      // Cоздание пользователя
      const hashPassword = bcrypt.hashSync(password, 7)
      const user = await db.query(
        `INSERT INTO users (name, login, password) values ('${name}', '${login}', '${hashPassword}') RETURNING id, name, login`
      )
      return res.status(200).json({
        err: false,
        message: "Пользователь успешно создан",
      })
    } catch (err) {
      res.status(500).json({ message: "Неизвестная ошибка сервера" })
    }
  }

  async login(req, res) {
    try {
      const { login, password } = req.body

      // Проверка на присутствие пользователя в базе
      let user = await db.query(`SELECT * FROM users WHERE login='${login}'`)
      if (user.rows.length === 0)
        return res.status(400).json({
          err: true,
          message: "Неверный логин или пароль",
        })

      // Проверка пароля
      user = user.rows[0]
      const isPasswordValid = bcrypt.compareSync(password, user.password)
      if (!isPasswordValid) {
        return res.status(400).json({
          err: true,
          message: "Неверный логин или пароль",
        })
      }

      // Создание jwt
      const token = generateAccessToken(user.id, user.name)
      return res.status(200).json({ err: false, token })
    } catch (err) {
      res.status(500).json({ message: "Неизвестная ошибка сервера" })
    }
  }
}

export default new AuthController()
