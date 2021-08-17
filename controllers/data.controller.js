import jwt from "jsonwebtoken"

class dataController {
  async getData(req, res) {
    try {
      const token = req.headers.authorization.split(" ")[1]
      if (!token) {
        res
          .status(403)
          .json({ err: true, errCode: 1, message: "Ошибка авторизации" })
      }
      const user = jwt.verify(token, process.env.SECRET_KEY)

      res.json({ user: user.id })
    } catch (err) {
      res.status(500).json({ message: "Неизвестная ошибка сервера" })
    }
  }
}

export default new dataController()
