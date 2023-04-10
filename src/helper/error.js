const { ApolloServerErrorCode } = require('@apollo/server/errors')

const { GraphQLError } = require('graphql')

const errors = {
    BAD_USER_INPUT: {
        errorcode: ApolloServerErrorCode.BAD_USER_INPUT,
        errorStatus: 422
    },
    BAD_REQUEST: {
        errorcode: ApolloServerErrorCode.BAD_REQUEST,
        errorStatus: 400
    },
    NOT_FOUND: {
        errorcode: "NOT_FOUND",
        errorStatus: 404
    },
    UNAUNTHENTICATED: {
        errorcode: "UNAUNTHENTICATED",
        errorStatus: 401
    },
    ALREDY_EXISTS: {
        errorcode: "ALREDY_EXISTS",
        errorStatus: 409
    },
    INTENAL_SERVER_ERROR: {
        errorcode: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
        errorStatus: 500
    },
    TOKEN_ERROR: {
        errorcode: "TOKEN_ERROR",
        errorStatus: 401
    }
}

const err = (errmessage, errType) => {
    throw new GraphQLError(errmessage, {
        extensions: {
            code: errType.errorcode,
            http: {
                status: errType.errorStatus
            }
        }
    })
}


module.exports = {
    errors,
    err
}