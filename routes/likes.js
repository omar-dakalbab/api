import express from 'express'
import { getAllLikes, getLikes, like } from '../controllers/like.js'

const router = express.Router()

router.get("/:id/:userid", getLikes)
router.get("/:userid", getAllLikes)

router.post("/likeInsert/:id/:userid", like)

export default router