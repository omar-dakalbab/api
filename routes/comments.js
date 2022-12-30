import express from 'express'
import { ApproveComment, DeleteComment, deleteCommentAll, getAll, getAllComments, insertComment, showComment } from '../controllers/comment.js'

const router = express.Router()

router.post("/insert-comment/:userId/:postId", insertComment)
router.get("/get-comments/:postId", showComment)
router.get("/get-comments", getAllComments)
router.get("/", getAll)
router.delete("/:id", deleteCommentAll)
router.post("/approve-comment/:id", ApproveComment)
router.delete("/delete-comment/:id", DeleteComment)

export default router