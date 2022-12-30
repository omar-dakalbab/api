import { db } from '../db.js'


export const giveRentRequest = (req, res) => {
    const userId = req.params.userId
    const q = "INSERT INTO send_caravan (caravan_type, caravan_marka, model_year, made_year, price,location, fuel_type, first_name, last_name, number, email, description, userId, startDate, endDate) VALUES (?)"
    const { caravan_type, marka, model_year, made_year, price, location, fuel_type, first_name, last_name, number, email, description, startDate, endDate } = req.body;
    const values = [caravan_type, marka, model_year, made_year, price, location, fuel_type, first_name, last_name, number, email, description, userId, startDate, endDate];
    db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err)
        else {
            const query = "INSERT INTO pasif_caravan_kiralama_istekler (caravan_type, caravan_marka, model_year, made_year, price,location, fuel_type, first_name, last_name, number, email, description, userId, startDate, endDate) VALUES (?)"
            db.query(query, [values], (err, data) => {
                if (err) return res.status(500).json(err)
                return res.status(200).json("Request Inserted!")
            })
        }
    })
}

export const getCaravanRequests = (req, res) => {
    const q = "SELECT * FROM send_caravan"
    db.query(q, (err, result) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json(result)
    })
}

export const ApproveRequest = (req, res) => {
    const id = req.params.id
    const query = "SELECT caravan_marka,road, fuel_type, caravan_type, price, location, userId, startDate, endDate, images FROM send_caravan WHERE id = ?"
    db.query(query, id, (err, data) => {
        if (err) return res.status(500).json(err)
        if (data.length) {
            const q = "INSERT INTO caravans (caravan_title, road, fuel_type, caravan_type, price, location, rented, userId, startDate, endDate, images) VALUES (?)"
            var objs = JSON.parse(JSON.stringify(data))
            const values = [objs[0].caravan_marka, objs[0].road, objs[0].fuel_type, objs[0].caravan_type, objs[0].price, objs[0].location, 'boş', objs[0].userId, objs[0].startDate, objs[0].endDate, objs[0].images]
            const values1 = [objs[0].caravan_marka, objs[0].road, objs[0].fuel_type, objs[0].caravan_type, objs[0].price, objs[0].location, 'boş', objs[0].userId, objs[0].startDate, objs[0].endDate]
            db.query(q, [values], (err, data) => {
                if (err) return res.status(500).json(err)
                const query2 = "INSERT INTO pasif_caravans (caravan_title, road, fuel_type, caravan_type, price, location, rented, userId, startDate, endDate) VALUES (?)"
                db.query(query2, [values1], (err, data) => {
                    if (err) return res.status(500).json(err)
                    return res.status(200).json("Caravan Inserted!")
                })
            })
        }
    })
}


export const caravanDelete = (req, res) => {
    const id = req.params.id
    const q = "DELETE FROM send_caravan WHERE id = ?"
    db.query(q, id, (err, data) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json("Caravan Deleted!")
    })

}
