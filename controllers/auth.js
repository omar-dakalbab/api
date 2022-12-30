import { db } from '../db.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register = (req, res) => {
    // Check if user exists
    const q = "SELECT * FROM users WHERE email = ?"

    db.query(q, [req.body.email], (err, data) => {
        if (err) return res.status(500).json(err)
        if (data.length > 0) {
            return res.status(409).json("Email already exists!")
        } else {
            // Create User
            // Hash Password
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(req.body.password, salt)

            const q = "INSERT INTO users (password, email, name, phone_number, date_of_birth) VALUES (?)"
            const values = [hashedPassword, req.body.email, req.body.name, req.body.phone, req.body.dateofbirth]
            db.query(q, [values], (err, data) => {
                if (err) return res.status(500).json(err)
                return res.status(200).json("User Inserted!")
            })
        }

    })

}

export const login = (req, res) => {
    // Check if user exists
    const q = "SELECT * FROM users WHERE email = ?"

    db.query(q, [req.body.email], (err, data) => {

        if (err) return res.status(500).json(err)
        if (data.length === 0) return res.status(404).json("User not found!, Register a new account :)")

        const checkPassword = bcrypt.compareSync(req.body.password, data[0].password)

        if (!checkPassword) return res.status(404).json("Wrong password!")

        const token = jwt.sign({ id: data[0].id }, "secretkey")

        const { password, ...others } = data[0]
        res.cookie("accessToken", token).status(200)
            .json(others);


    })

}
export const loginAdmin = (req, res) => {
    const username = req.body.email;
    const password = req.body.password;
    console.log(username + ' ' + password)
    const token = jwt.sign({ id: 362183 }, "secretKey")
    if (username === 'admin' && password === 'admin') return res.cookie("accessSecure", token).status(200).json('ok!')
    else return res.status(200).json('error')
}
export const logout = (req, res) => {
    console.log('logged out')
}