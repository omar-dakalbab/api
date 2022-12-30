import { db } from '../db.js'
import bcrypt from 'bcryptjs'

export const GetAllUser = (req, res) => {
    const q = "SELECT * FROM users"
    db.query(q, (err, result) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json(result)
    })
}

export const user = (req, res) => {
    const q = "SELECT * FROM users WHERE id=?"
    const id = req.params.id;
    db.query(q, id, (err, result) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json(result)
    })
}

export const updateUser = (req, res) => {
    const q = "UPDATE users SET email = ?, name = ?, phone_number = ?, location = ? WHERE id = ?"
    const id = req.params.id;
    db.query(q, [req.body.email, req.body.name, req.body.phone_number, req.body.location, id], (err, result) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json(result)
    })
}

export const updatePassword = (req, res) => {
    const q = "UPDATE users SET password = ? WHERE id = ?"
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt)
    const id = req.params.id;
    db.query(q, [hashedPassword ,id], (err, result) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json(result)
    })
}

//Delete blog by ID
export const removeUser = (req, res) => {
    const id = req.params.id;
    const q = "DELETE FROM users where id = ?"
    db.query(q, id, (err, data) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json("User Deleted!")
    })
}

