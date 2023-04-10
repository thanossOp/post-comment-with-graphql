const mongoose = require('mongoose')

const commentschema = new mongoose.Schema({

    comment: {
        type: String,
        require: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    postOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    versionKey: false,
    timestamps: true
})

const Comment = mongoose.model('Comment', commentschema)

module.exports = Comment