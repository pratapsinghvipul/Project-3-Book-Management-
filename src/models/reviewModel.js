const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId
/*------------------------------------------Book Schema:-------------------------------------------*/
const reviewSchema = new mongoose.Schema({


    bookId: {
        type: ObjectId,
        required: true,
        ref: 'book'
    },
    reviewedBy: {
        type: String,
        required: true,
        trim:true,
        default: 'Guest'
    },
    reviewedAt: {
        type: Date,
        default:Date.now(),
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    review: {
        type: String,
        trim:true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },




}, { timestamps: true });


/*------------------------------------------Export Modules:-------------------------------------------*/
module.exports = mongoose.model('review', reviewSchema)  // book