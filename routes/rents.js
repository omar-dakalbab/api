import express from 'express'
import { giveRentRequest, getCaravanRequests, caravanDelete, ApproveRequest } from '../controllers/rent.js'
import multer from 'multer';
import { db } from '../db.js'

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

const upload = multer({ storage }).any();

router.post("/send-requset/:userId", upload, (req, res) => {
    var arr = req.files;
    var filename = [];
    arr.forEach(ar => filename.push(ar.filename))
    const files = filename.toString();
    var d = req.body.inputs
    // DATA
    var e = JSON.parse(d)
    try {
        const userId = req.params.userId
        const q = "INSERT INTO send_caravan (caravan_type, caravan_marka, model_year, made_year, price,location, fuel_type, first_name, last_name, number, email, description, userId, startDate, endDate, images) VALUES (?)"
        const values = [e.caravan_type, e.marka, e.model_year, e.made_year, e.price, e.location, e.fuel_type, e.first_name, e.last_name, e.number, e.email, e.description, userId, e.startDate, e.endDate, files];
        const values2 = [e.caravan_type, e.marka, e.model_year, e.made_year, e.price, e.location, e.fuel_type, e.first_name, e.last_name, e.number, e.email, e.description, userId, e.startDate, e.endDate];
        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err)
            else {
                const query = "INSERT INTO pasif_caravan_kiralama_istekler (caravan_type, caravan_marka, model_year, made_year, price,location, fuel_type, first_name, last_name, number, email, description, userId, startDate, endDate) VALUES (?)"
                db.query(query, [values2], (err, data) => {
                    if (err) return res.status(500).json(err)
                    return res.status(200).json("Request Inserted!")
                })
            }
        })
    }
    catch (err) {
        console.log(err)
    }
})


router.get("/approve-request/:id", ApproveRequest)
router.delete("/delete/:id", caravanDelete)
router.get("/get-caravan-req", getCaravanRequests)
export default router