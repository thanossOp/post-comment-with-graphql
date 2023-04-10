const mongoose = require('mongoose')

const postschema = new mongoose.Schema({

    post_name: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    isDeleted: {
        type: Boolean,
        default: false
    },

},
    {
        timestamps: true,
        versionKey: false
    })



const Post = mongoose.model("Post", postschema)

module.exports = Post