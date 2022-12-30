import CookieParser from 'cookie-parser';
import express from 'express'
import cors from 'cors'
const app = express();
import authRoutes from './routes/auth.js'
import userRoutes from './routes/users.js'
import blogRoutes from './routes/blogs.js'
import caravanRoutes from './routes/caravans.js'
import likeRoutes from './routes/likes.js'
import RentRoutes from './routes/rents.js';
import CommentRoutes from './routes/comments.js';
import multer from 'multer';


//middlewares
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Origin", true);
    next();
})
app.use(express.json())
app.use(CookieParser())
app.use(
    cors({
        methods: ["GET", "POST", "DELETE", "PUT"],
        credentials: true,
        origin: "http://caravinn.com"
    })
)

app.use("/api/auth", authRoutes)
app.use("/api/like", likeRoutes)
app.use("/api/comment", CommentRoutes)
app.use("/api/user", userRoutes)
app.use("/api/blog", blogRoutes)
app.use("/api/caravan", caravanRoutes)
app.use("/api/rent", RentRoutes)

function between(min, max) {
    return Math.floor(
        Math.random() * (max - min + 1) + min
    )
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const randomNumber = between(10, 200);
        const newFilename = `${new Date().getDate()}-${new Date().getMonth() +
            1}-${new Date().getFullYear()}-${randomNumber}-${file.originalname}`;
        cb(null, newFilename);
    }
});

const upload = multer({ storage }).any();

app.post("/insertImage", upload, (req, res) => {
    var arr = req.files;
    arr.forEach(ar => console.log(ar.filename))
});



app.get("/", (req, res) => {
    res.send("Server working")
})

app.listen(process.env.PORT || 3001, () => {
    console.log("API Working!");
});