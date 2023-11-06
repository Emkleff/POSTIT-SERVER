const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { isEmail} = require('validator')
const bcrypt = require('bcryptjs') 

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        minlength: 6,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        validate: isEmail,
        required: true,
    },
    password: {
        type: String,
        trim: true,
        minlength: 7,
        required: true,
    },
},
    { timestamps: true }
);

userSchema.pre( 'save', async function (next) {
// hash password
const salt = await bcrypt.genSalt();
this.password = await bcrypt.hash(this.password, salt);
next();
})

module.exports = mongoose.model('user', userSchema);