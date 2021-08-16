import Router from "express"
import authController from "../controllers/auth.controller.js"

const authRouter = new Router()

authRouter.post("/register", authController.register)
authRouter.post("/login", authController.login)

export default authRouter
