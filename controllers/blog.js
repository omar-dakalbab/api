
import { db } from '../db.js'
import moment from 'moment'

//Display Blog posts
export const post = (req, res) => {
    // Check if user exists
    const q = "SELECT * FROM blogtbl"
    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json(data)
    })

}

//Display Blog post by ID
export const id = (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM blogtbl WHERE id = ?", id, (err, data) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json(data)
    })
}

//Insert Blog into DB
export const add = (req, res) => {
    const obj = JSON.stringify(req.file.filename)
    const newObj = obj.replace(/['"]+/g, '')
    const date = new Date();
    const q = "INSERT INTO blogtbl (blog_image, blog_title, blog_header, blog_body, date_created) VALUES (?)"
    const values = [newObj, req.body.blog_title, req.body.blog_header, req.body.blog_body, date]
    db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json("Blog Inserted!")
    })
}

//Delete blog by ID
export const postremove = (req, res) => {
    const id = req.params.id;
    const q = "DELETE FROM blogtbl where id = ?"
    db.query(q, id, (err, data) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json("Blog Deleted!")
    })
}

export const update = (req, res) => {
    // Check if user exists
    const id = req.params.id;
    const { blog_title, blog_header, blog_body } = req.body;
    const date = new Date();
    const q = "UPDATE blogtbl SET blog_title = ?, blog_header = ?, blog_body = ?, date_created = ? WHERE id = ?"
    db.query(q, [blog_title, blog_header, blog_body, date, id], (err, data) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json("Blog Post Updated!")
    })
}




