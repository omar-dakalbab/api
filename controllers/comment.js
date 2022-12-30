import { db } from '../db.js'
export const insertComment = (req, res) => {
    const q = "INSERT INTO comment_approve (userId, postId,name, comment, rate, date_created) VALUES (?)"
    const postId = req.params.postId;
    const userId = req.params.userId;
    const rate = 0;
    const date = new Date()
    const values = [userId, postId, req.body.name, req.body.comment, rate, date]
    db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json(data)
    })
}


export const showComment = (req, res) => {
    const postId = req.params.postId
    const q = "SELECT * FROM comments WHERE postId = ?"
    db.query(q, [postId], (err, data) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json(data)
    })
}

export const getAllComments = (req, res) => {
    const postId = req.params.postId
    const q = "SELECT * FROM comment_approve"
    db.query(q, [postId], (err, data) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json(data)
    })
}
export const getAll = (req, res) => {
    const postId = req.params.postId
    const q = "SELECT * FROM comments"
    db.query(q, [postId], (err, data) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json(data)
    })
}

export const ApproveComment = (req, res) => {
    const id = req.params.id
    const query = "SELECT comment, postId, userId,name, rate, date_created FROM comment_approve WHERE id = ?"
    db.query(query, id, (err, data) => {
        if (err) return res.status(500).json(err)
        if (data.length) {
            const q = "INSERT INTO comments (postId, userId,name, comment, rate, date_created) VALUES (?)"
            var objs = JSON.parse(JSON.stringify(data))
            const values = [objs[0].postId, objs[0].userId, objs[0].name, objs[0].comment, objs[0].rate, objs[0].date_created]
            db.query(q, [values], (err, data) => {
                if (err) return res.status(500).json(err)
                return res.status(200).json("Comment Inserted!")
            })
        }
    })
}

export const DeleteComment = (req, res) => {
    const id = req.params.id;
    const q = "DELETE FROM comment_approve where id = ?"
    db.query(q, id, (err, data) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json("Comment Deleted!")
    })
}

export const deleteCommentAll = (req, res) => {
    const id = req.params.id;
    const q = "DELETE FROM comments where id = ?"
    db.query(q, id, (err, data) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json("Comment Deleted!")
    })
}