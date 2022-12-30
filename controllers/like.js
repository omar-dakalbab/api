import { db } from '../db.js'

export const getLikes = (req, res) => {
    const id = req.params.id;
    const userid = req.params.userid;
    const q = "SELECT * FROM likes WHERE postId = ? && userId = ?"

    db.query(q, [id, userid], (err, data) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json(data)
    })
}

export const getAllLikes = (req, res) => {
    const userid = req.params.userid;
    const q = "SELECT postId FROM likes WHERE userId = ?"

    db.query(q, [userid], (err, data) => {
        if (err) return res.status(500).json(err)
        if (data.length) {
            var objs = JSON.parse(JSON.stringify(data))
            let idsOnly = objs.map(obj => obj.postId);
            const q = "SELECT * FROM caravans WHERE id IN (?)"
            db.query(q, [idsOnly], (err, result) => {
                if (err) return res.status(500).json(err)
                return res.status(200).json(result)
            })
        }
    })
}

export const like = (req, res) => {
    const id = req.params.id;
    const userid = req.params.userid;

    const query = "SELECT * FROM likes WHERE postId = ? && userId = ?"


    db.query(query, [id, userid], (err, data) => {
        if (err) return res.status(500).json(err)
        if (data.length) {
            const q_delete = "DELETE FROM likes WHERE postId = ? && userId = ?"
            db.query(q_delete, [id, userid], (err, data_delete) => {
                if (err) return res.status(500).json(err)
                return res.status(200).json("Deleted!")
            })
        } else {
            const q = "INSERT INTO likes (postId, userId) VALUES (?)"
            const VALUES = [id, userid];
            db.query(q, [VALUES], (err, data) => {
                if (err) return res.status(500).json(err)
                return res.status(200).json('Inserted Success')
            })
        }
    })
}

