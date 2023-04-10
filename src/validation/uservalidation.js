const joi = require('joi')

const validate_user = joi.object({
    firstname: joi.string()
        .min(2)
        .max(10)
        .required(),
    lastname: joi.string()
        .min(2)
        .max(10)
        .required(),
    email: joi.string()
        .required()
        .pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
    password: joi.string()
        .min(6)
        .max(15)
        .pattern(/^[\w_]*$/)
        .required(),
    confirmpassword: joi.string()
        .valid(joi.ref('password')).required().messages({ 'any.only': '{{#label}} does not match' }),
    role: joi.string()
})


module.exports = validate_user

// const {GraphQLError} = require('graphql')

// const validate_user = (args)=>{
//     const {firstname} = args
// }