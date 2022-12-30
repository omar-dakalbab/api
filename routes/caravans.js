import express from 'express'
import { caravan, caravanAdd, caravanByDate, promoteCaravan, caravanById, caravanByLocation, caravanByUserId, caravanDelete, GetRentedHistory, showRented, ShowRentedcaravanByUserId, update, updateByUser, updateRented } from '../controllers/caravan.js'
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

router.post("/upload-pp", upload, (req, res) => {
    var arr = req.files;
    var filename = [];
    arr.forEach(ar => filename.push(ar.filename))
    const files = filename.toString();
    var d = req.body.inputs
    // DATA
    var e = JSON.parse(d)
    try {
        const q = "INSERT INTO caravans (caravan_title, road, fuel_type, caravan_type, price, location, rented, pr, images, userId) VALUES (?)"
        const values = [e.caravan_title, e.road, e.fuel_type, e.caravan_type, e.price, e.location, 'bos', '0', files, '0']
        
        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err)
            else{
                const values2 = [e.caravan_title, e.road, e.fuel_type, e.caravan_type, e.price, e.location, 'bos', '0']
                const query = "INSERT INTO pasif_caravans (caravan_title, road, fuel_type, caravan_type, price, location, rented, userId) VALUES (?)"
                db.query(query, [values2], (err, data) => {
                    if (err) return res.status(500).json(err)
                    return res.status(200).json("Caravan Inserted!")
                })
            }
        })
    }
    catch(err){
        console.log(err)
    }
})

router.post("/add", caravanAdd)

router.get("/cr", showRented)
router.get("/", caravan)
router.get("/by-location/:id", caravanByLocation)
router.get("/:id", caravanById)
router.get("/user-id/:id", caravanByUserId)
router.get("/rented-user-id/:id", ShowRentedcaravanByUserId)
router.get("/by-date", caravanByDate)
router.get("/rented-history-id/:id", GetRentedHistory)

router.delete("/delete/:id", caravanDelete)

router.put("/rented/:id/:userId", updateRented)
router.put("/update-by-user/:id", updateByUser)
router.put("/update/:id", update)
router.put("/promote-caravan/:id", promoteCaravan)

export default router