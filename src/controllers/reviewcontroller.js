const mongoose = require('mongoose');
const reviewModel = require('../models/reviewModel')
const booksModel = require('../models/booksModel')
const { isValid, ratingValidator, regexValidator } = require('../validator/validation')

//------------------------------------------------createReview----------------------------------------------//

const createReview = async function (req, res) {
    try {
        let data = req.body
        let bookId = req.params.bookId
        let { reviewedBy, rating, review } = data

        if (Object.keys(data).length == 0) { return res.status(400).send({ status: false, message: "please enter the data" }) }
        if (!bookId) { return res.status(400).send({ status: false, message: "please provide bookId" }) }
        if (!mongoose.isValidObjectId(bookId)) { return res.status(400).send({ status: false, message: "please enter  valid bookId" }) }
        data.bookId = bookId
        if (!isValid(reviewedBy) || !regexValidator(reviewedBy)) { return res.status(400).send({ status: false, message: "please enter the name reviewed book by the person" }) }
        if (!isValid(rating) || !ratingValidator(rating)) { return res.status(400).send({ status: false, message: "please enter ratings or in correct way" }) }
        if (!isValid(review)) { return res.status(400).send({ status: false, message: "please enter review" }) }

        let findBook = await booksModel.findOneAndUpdate({ _id: bookId, isDeleted: false }, { $inc: { reviews: 1 } }, { new: true })
        if (!findBook) { return res.status(400).send({ status: false, message: "No such book available or the Book is Deleted" }) }
        let saveData = await reviewModel.create(data)

        return res.status(201).send({ status: true, message: 'Success', data: saveData })
    }
    catch (error) { res.status(500).send({ status: false, message: error.message }) }
}

//------------------------------------------------updateReviews----------------------------------------------//

const updateReview = async function (req, res) {
    try {
        let bookId = req.params.bookId
        let reviewId = req.params.reviewId
        let data = req.body
        let { reviewedBy, rating, review } = data

        if (!mongoose.isValidObjectId(bookId)) { return res.status(400).send({ status: false, message: "please enter  valid bookId" }) }

        if (!mongoose.isValidObjectId(reviewId)) { return res.status(400).send({ status: false, message: "please enter  valid reviewId" }) }

        if (Object.keys(data).length == 0) { return res.status(400).send({ status: false, message: "please enter the data" }) }

        if (!regexValidator(reviewedBy)) { return res.status(400).send({ status: false, message: "please enter the valid name" }) }
       console.log(typeof rating)

        if (rating) { if (!ratingValidator(rating) || typeof rating === String ) { return res.status(400).send({ status: false, message: "please enter rating between 0 to 5" }) } }
        //  if (typeof rating === "string") { return res.status(400).send({ status: false, message: "please enter rating in number" }) } 
        if( review === "") {return res.status(400).send({ status: false, message: "please enter something in review" }) }
        let findBook = await booksModel.findOne({ _id: bookId, isDeleted: false })
        if (!findBook) { return res.status(404).send({ status: false, message: "book does not exist or deleted" }) }

        let updateReview = await reviewModel.findOneAndUpdate({ _id: reviewId, bookId: bookId, isDeleted: false }, { reviewedBy: reviewedBy, rating: rating, review: review }, { new: true })
        if (!updateReview) { return res.status(404).send({ status: false, message: "review does not exist or Wrong reviewId for the provided bookId" }) }

        return res.status(200).send({ status: true, message: 'Success', data: updateReview })
    }
    catch (error) { res.status(500).send({ status: false, message: error.message }) }
}

//------------------------------------------------deleteReviews----------------------------------------------//

const deleteReview = async (req, res) => {
    try {
        let bookId = req.params.bookId
        let reviewId = req.params.reviewId

        if (!mongoose.isValidObjectId(bookId)) { return res.status(400).send({ status: false, message: "please enter  valid bookId" }) }
        if (!mongoose.isValidObjectId(reviewId)) { return res.status(400).send({ status: false, message: "please enter  valid reviewId" }) }

        let bookCheck = await booksModel.findOne({ _id: bookId, isDeleted: false })
        if (!bookCheck) { return res.status(404).send({ status: false, message: "book does not exist or deleted" }) }

        let deleteReview = await reviewModel.updateOne({ _id: reviewId, bookId: bookId, isDeleted: false }, { isDeleted: true }, { new: true })
        if (deleteReview.modifiedCount == 0) { return res.status(404).send({ status: false, message: "review does not exist or Wrong reviewId for the provided bookId" }) }

        let deleteBookReview = await booksModel.updateOne({ _id: bookId, isDeleted: false }, { $inc: { reviews: -1 } }, { new: true })

        return res.status(200).send({ status: true, message: 'Success' })
    }
    catch (error) { res.status(500).send({ status: false, message: error.message }) }
}

module.exports.createReview = createReview
module.exports.updateReview = updateReview
module.exports.deleteReview = deleteReview