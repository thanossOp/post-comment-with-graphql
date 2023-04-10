const User = require('../../model/user')

const jwt = require('jsonwebtoken')

const { secretkey } = require('../../config/credentials')

const bcrypt = require('bcryptjs')

const { err, errors } = require('../../helper/error')

const validate_user = require('../../validation/uservalidation')

const { GraphQLError } = require('graphql')

const errormessage = require('../../helper/joierrors')

const { adminrole } = require('../../middleware/rolemanagement')

const signup = {
    Query: {
        getAllUsers: async (parent, args, context) => {

            const { token } = context

            await adminrole(token)

            const users = await User.find({})
            return users
        },
        getUser: async (parent, args, context) => {

            const { token } = context

            await adminrole(token)

            const user = await User.findById(args.id)
            if (user) {
                return user
            } else {
                err(
                    "User Not Found",
                    errors.NOT_FOUND
                )
            }
        }
    },
    Mutation: {
        signup: async (parent, args) => {


            const options = {
                abortEarly: false,
                messages: errormessage
            }

            const { error, value } = validate_user.validate(args, options)

            if (error) {
                const errmessage = error.details.map((d) => d.message)
                throw new GraphQLError(errmessage, {
                    extensions: {
                        code: "Field_Validation_Error",
                        http: {
                            status: 403
                        }
                    }
                })
            }

            const adduser = new User(value)

            const newuser = await adduser.save()
            return newuser
        },
        login: async (parent, args) => {

            const email = args.email
            const password = args.password
            const id = args.id


            const user = await User.findOne({ email: email })

            if (!user) {
                err(
                    'Email is not registered',
                    errors.UNAUNTHENTICATED
                )
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (isMatch) {
                const payload = {
                    email: email,
                    password: password,
                }

                const token = jwt.sign(payload, secretkey, { expiresIn: '10d' })
                return { email: user.email, token: token }
            }
        }
    }

}

module.exports = signup