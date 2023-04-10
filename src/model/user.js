const mongoose = require('mongoose')

const bcrypt = require('bcryptjs')

const userschema = new mongoose.Schema({
    firstname: {
        type: String,
        require: true
    },
    lastname: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    confirmpassword: {
        type: String,
        require: true
    },
    role: {
        type: String,
        default: 'User'
    },
    isDeleted: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true,
    versionKey: false
})

userschema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10)

    }
    next()
})

const User = mongoose.model('User', userschema)

module.exports = User