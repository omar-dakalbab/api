import { db } from '../db.js'

export const caravanByLocation = (req, res) => {
    const location = req.params.id
    if (location == 'all') {
        const q = "SELECT * FROM caravans WHERE rented=? ORDER BY pr DESC"
        db.query(q, ['boş'], (err, data) => {
            if (err) return res.status(500).json(err)
            return res.status(200).json(data)
        })
    }
    else if (location == 'moto') {
        const q = "SELECT * FROM caravans WHERE rented=? AND caravan_type LIKE ? ORDER BY pr DESC"
        db.query(q, ['boş', '%' + location + '%'], (err, data) => {
            if (err) return res.status(500).json(err)
            return res.status(200).json(data)
        })
    }
    else if (location == 'cekme') {
        const q = "SELECT * FROM caravans WHERE rented=? AND caravan_type LIKE ? ORDER BY pr DESC"
        db.query(q, ['boş', '%' + location + '%'], (err, data) => {
            if (err) return res.status(500).json(err)
            return res.status(200).json(data)
        })
    } else {
        const q = "SELECT * FROM caravans WHERE rented = ? AND location LIKE ? ORDER BY pr DESC"
        db.query(q, ['boş', '%' + location + '%'], (err, data) => {
            if (err) return res.status(500).json(err)
            return res.status(200).json(data)
        })
    }
}

export const caravan = (req, res) => {
    const q = "SELECT * FROM caravans ORDER BY pr DESC"
    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json(data)
    })
}

export const showRented = (req, res) => {
    const q = "SELECT * FROM rented_caravans"
    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json(data)
    })
}


export const caravanById = (req, res) => {
    const id = req.params.id;
    const q = "SELECT * FROM caravans WHERE id = ?"
    db.query(q, id, (err, data) => {
        if (err) return res.status(500).json(err)
        if (data.length) res.status(200).json(data)
    })
}

export const GetRentedHistory = (req, res) => {
    const id = req.params.id;
    const q = "SELECT * FROM pasif_kira WHERE userId = ?"
    db.query(q, id, (err, data) => {
        if (err) return res.status(500).json(err)
        if (data.length) res.status(200).json(data)
    })
}

export const caravanByUserId = (req, res) => {
    const id = req.params.id;
    const q = "SELECT * FROM caravans WHERE userId = ?"
    db.query(q, id, (err, data) => {
        if (err) return res.status(500).json(err)
        if (data.length) res.status(200).json(data)
    })
}

export const ShowRentedcaravanByUserId = (req, res) => {
    const id = req.params.id;
    const q = "SELECT startDate, endDate, caravanId FROM rented_caravans WHERE userId = ?"
    db.query(q, id, (err, data) => {
        if (err) return res.status(500).json(err)
        if (data.length) res.status(200).json(data)
    })
}

export const update = (req, res) => {
    const id = req.params.id;
    const { caravan_title, road, fuel_type, caravan_type, price, pr, location, rented, images } = req.body;
    const q = "UPDATE caravans SET caravan_title = ?, road = ?, fuel_type = ?, caravan_type = ?, price = ?,pr = ?, location = ?, rented = ?, images = ? WHERE id = ?"
    db.query(q, [caravan_title, road, fuel_type, caravan_type, price, pr, location, rented, images, id], (err, data) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json("Caravan Updated!")
    })
}

export const updateByUser = (req, res) => {
    const id = req.params.id;
    const { caravan_title, road, fuel_type, caravan_type, price, location } = req.body;
    const q = "UPDATE caravans SET caravan_title = ?, road = ?, fuel_type = ?, caravan_type = ?, price = ?, location = ? WHERE id = ?"
    db.query(q, [caravan_title, road, fuel_type, caravan_type, price, location, id], (err, data) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json("Caravan Updated!")
    })
}

export const caravanAdd = (req, res) => {
    const q = "INSERT INTO caravans (caravan_title, road, fuel_type, caravan_type, price, location, rented, pr) VALUES (?)"
    const values = [req.body.caravan_title, req.body.road, req.body.fuel_type, req.body.caravan_type, req.body.price, req.body.location, 'bos', '0']
    const values2 = [req.body.caravan_title, req.body.road, req.body.fuel_type, req.body.caravan_type, req.body.price, req.body.location, 'bos']
    db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err)
        else {
            const query = "INSERT INTO pasif_caravans (caravan_title, road, fuel_type, caravan_type, price, location, rented) VALUES (?)"
            db.query(query, [values2], (err, data) => {
                if (err) return res.status(500).json(err)
                return res.status(200).json("Caravan Inserted!")
            })
        }
    })
}



export const caravanDelete = (req, res) => {
    const id = req.params.id
    const q = "DELETE FROM caravans WHERE id = ?"
    db.query(q, id, (err, data) => {
        if (err) return res.status(500).json(err)
        else {
            const q = "DELETE FROM rented_caravans WHERE caravanId = ?"
            db.query(q, id, (err, data) => {
                if (err) return res.status(500).json(err)
            })
        }
    })
}

export const updateRented = (req, res) => {
    const id = req.params.id
    const userId = req.params.userId
    const values = [id, userId, req.body.startDate, req.body.endDate]
    const q = "INSERT INTO rented_caravans (caravanId, userId, startDate, endDate) VALUES (?)"
    db.query(q, [values], (err, data) => {
        if (err) {
            res.status(500).json(err)
        }
        else {
            const q = "UPDATE caravans SET rented = ? WHERE id = ?"
            db.query(q, ['Kiralandı', id], (err, data) => {
                if (err) return res.status(500).json(err)
                else {
                    const q = "INSERT INTO pasif_kira (caravanId, userId, startDate, endDate) VALUES (?)"
                    db.query(q, [values], (err, data) => {
                        if (err) return res.status(500).json(err)
                        return res.status(200).json("Caravan Rented!")
                    })
                }
            })
        }
    })
}


export const caravanByDate = (req, res) => {
    const q = "SELECT * FROM caravans Where location = ?"
    db.query(q, [req.body.location], (err, data) => {
        if (err) return res.status(500).json(err)
        if (data.length) return res.status(200).json(data)
    })
}

export const promoteCaravan = (req, res) => {
    const q = "UPDATE caravans SET pr = ? WHERE id = ?"
    db.query(q, [1, req.params.id], (err, data) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json("Caravan Promoted!")
    })
}