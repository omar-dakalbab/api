import express from 'express'
import { GetAllUser, updateUser, user, removeUser, updatePassword } from '../controllers/user.js'
const router = express.Router()

router.get("/:id", user)
router.get("/", GetAllUser)
router.put("/edit-user/:id", updateUser)
router.put("/update-password/:id", updatePassword)
router.delete("/remove-user/:id", removeUser)


export default router
