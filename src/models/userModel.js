const mongoose = require('mongoose');

/*------------------------------------------User Schema:-------------------------------------------*/
const userSchema = new mongoose.Schema({
    
        title: {
            type: String,
            required: true,
            enum: ["Mr", "Mrs", "Miss"]
        },
        name: {
            type: String,
            required: true,
            trim:true
        },
        phone: {
            type: String,
            required: true,
            unique: true,
            trim:true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim:true
        },
        password: {
            type: String,
            required: true,
            trim:true
        },
        address: {
            street: { type: String },
            city: { type: String },
            pincode: { type: String }
        },
    }, { timestamps: true });


/*------------------------------------------Export Modules:-------------------------------------------*/
module.exports = mongoose.model('user', userSchema)  // user