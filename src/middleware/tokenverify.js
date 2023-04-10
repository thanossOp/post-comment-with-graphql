const jwt = require('jsonwebtoken')

const { secretkey } = require('../config/credentials')

const User = require('../model/user')

const { err, errors } = require('../helper/error')

const tokenResult = async (token) => {
    try {
        if (!token) {
            err(
                "Token must be provided",
                errors.TOKEN_ERROR
            )
        }
        const verifyToken = jwt.verify(token, secretkey)
        if (!verifyToken) {
            err(
                "Invalid Authorization Token",
                errors.UNAUNTHENTICATED
            )
        }

        const user = await User.findOne({ email: verifyToken.email })
        if (!user) {
            err(
                "User Not Found",
                errors.NOT_FOUND
            )
        }
        return user

    } catch (error) {
        return null
    }
}

module.exports = { tokenResult }