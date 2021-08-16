class AuthController {
  async register(req, res) {
    try {
      const { a } = req.body
      res.status(200).json({ message: "it works" + a })
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" })
    }
  }

  async login() {
    try {
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" })
    }
  }
}

export default new AuthController()
