import jwt from "jsonwebtoken"
import db from "../db.js"
import { verifyJwt } from "../utils.js"

class childrenController {
  async getAll(req, res) {
    try {
      const user = verifyJwt(req, process.env.SECRET_KEY)
      if (user.err) {
        return res.status(403).json({
          err: true,
          errCode: 4,
          message: "Ошибка авторизации. Невалидный токен",
        })
      }
      const children = await db.query(
        `SELECT * FROM children WHERE user_id='${user.id}'`
      )
      res.json({ err: false, data: children.rows })
    } catch (err) {
      res
        .status(500)
        .json({ err: true, errCode: 0, message: "Неизвестная ошибка сервера" })
    }
  }

  async create(req, res) {
    try {
      const user = verifyJwt(req, process.env.SECRET_KEY)
      if (user.err) {
        return res.status(403).json({
          err: true,
          errCode: 4,
          message: "Ошибка авторизации. Невалидный токен",
        })
      }
      const { name, sex, born } = req.body
      const child = await db.query(
        `INSERT INTO children (user_id, name, sex, born) VALUES ('${user.id}', '${name}', '${sex}', '${born}') RETURNING *`
      )
      res.json({ err: false, data: child.rows[0] })
    } catch (err) {
      res
        .status(500)
        .json({ err: true, errCode: 0, message: "Неизвестная ошибка сервера" })
    }
  }

  async update(req, res) {
    try {
      const user = verifyJwt(req, process.env.SECRET_KEY)
      if (user.err) {
        return res.status(403).json({
          err: true,
          errCode: 4,
          message: "Ошибка авторизации. Невалидный токен",
        })
      }
      const { id, name, sex, born } = req.body
      const child = await db.query(
        `UPDATE children SET name='${name}', sex='${sex}', born = '${born}' WHERE id='${id}' AND user_id='${user.id}' RETURNING *`
      )
      res.json({ err: false, data: child.rows[0] })
    } catch (err) {
      res
        .status(500)
        .json({ err: true, errCode: 0, message: "Неизвестная ошибка сервера" })
    }
  }

  async delete(req, res) {
    try {
      const user = verifyJwt(req, process.env.SECRET_KEY)
      if (user.err) {
        return res.status(403).json({
          err: true,
          errCode: 4,
          message: "Ошибка авторизации. Невалидный токен",
        })
      }
      const { id } = req.body
      await db.query(
        `DELETE FROM children WHERE id='${id}' AND user_id='${user.id}'`
      )
      res.json({ err: false, data: { id } })
    } catch (err) {
      res
        .status(500)
        .json({ err: true, errCode: 0, message: "Неизвестная ошибка сервера" })
    }
  }
}

export default new childrenController()
