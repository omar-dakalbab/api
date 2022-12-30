import express from 'express'
import { post, id, add, postremove, update } from '../controllers/blog.js'
import multer from 'multer'

const router = express.Router()

function between(min, max) {
    return Math.floor(
        Math.random() * (max - min + 1) + min
    )
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../ui/public/img')
    },
    filename: (req, file, cb) => {
        const randomNumber = between(10, 200);
        const newFilename = `${new Date().getDate()}-${new Date().getMonth() +
            1}-${new Date().getFullYear()}-${randomNumber}-${file.originalname}`;
        cb(null, newFilename);
    }
});

const upload = multer({ storage: storage })

router.get("/post", post)
router.get("/post/:id", id)
router.put("/update/:id", update)
router.post("/add", upload.single('file'), add)
router.delete("/post-remove/:id", postremove)

export default router