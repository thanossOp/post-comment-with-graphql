const signup = require('./user')

const postschema = require('./post')

const commentschema = require('./comment')

module.exports = [
    signup,
    postschema,
    commentschema
]


