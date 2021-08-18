import Router from "express"
import childrenController from "../controllers/children.controller.js"

const router = new Router()

router.get("/children", childrenController.getAll)
router.post("/children", childrenController.create)

export default router
