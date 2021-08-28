import Router from "express"
import childrenController from "../controllers/children.controller.js"

const router = new Router()

router.get("/children", childrenController.getAll)
router.post("/children", childrenController.create)
router.patch("/children", childrenController.update)
router.delete("/children", childrenController.delete)

export default router
