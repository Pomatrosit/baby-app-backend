import jwt from "jsonwebtoken"

class dataController {
  async getData(req, res) {
    try {
      const token = req.headers.authorization.split(" ")[1]

      jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
        if (err)
          return res.status(403).json({
            err: true,
            errCode: 4,
            message: "Ошибка авторизации. Невалидный токен",
          })
        res.json({ user: payload.id })
      })
    } catch (err) {
      res
        .status(500)
        .json({ err: true, errCode: 0, message: "Неизвестная ошибка сервера" })
    }
  }
}

export default new dataController()
