import Router from "express"
import dataController from "../controllers/data.controller.js"

const router = new Router()

router.get("/data", dataController.getData)

export default router
