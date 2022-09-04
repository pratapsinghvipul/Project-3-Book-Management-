
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')
const booksModel = require('../models/booksModel')

//------------------------------------------------Authentication of user----------------------------------------------//

const authentication = async function (req, res, next) {
    try {
        let token = req.headers["x-api-key" || "X-Api-Key"]
        if (!token) {
            return res.status(401).send({ message: "no token found" })
        }
        let decodeToken = jwt.verify(token, "ourThirdProject")
        if (!decodeToken) {
            return res.status(401).send({ message: "Invalid token" })
        }
        req.abcd = decodeToken
        next();
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

//------------------------------------------------Authorization for Creating book----------------------------------------------//

const authorisation = async function (req, res, next) {
    let data = req.body.userId
    let decodeToken = req.abcd
    let userid = decodeToken.userId

    if (!mongoose.isValidObjectId(data)) { return res.status(400).send({ status: false, message: "please enter  valid userId" }) }
    if (userid != data) return res.status(403).send({ message: "you are not authorised " })
    next()
}

//------------------------------------------------Authorization for updateBook and deleteBook----------------------------------------------//

const authorisation2 = async function (req, res, next) {
    let param = req.params.bookId
    if (!mongoose.isValidObjectId(param)) { return res.status(400).send({ status: false, message: "please enter  valid bookId" }) }
    let decodeToken = req.abcd
    let userId = decodeToken.userId
    let finduser = await booksModel.findById(param)
    if (!finduser) { return res.status(400).send({ message: "No such book available" }) }
    let userId1 = finduser.userId

    if (userId != userId1) { return res.status(403).send({ message: "you are not authorised" }) }

    next()
}

module.exports.authentication = authentication
module.exports.authorisation = authorisation
module.exports.authorisation2 = authorisation2