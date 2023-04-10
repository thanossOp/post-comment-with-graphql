const { gql } = require('graphql-tag')

const userschema = gql`

type User {
    id : String!
    firstname : String!
    lastname : String!
    email : String!
    password : String!
    confirmpassword : String!
    isDeleted : Boolean
    role : String!
}

type Token {
    email : String!
    token : String!
}

type Query {
    getAllUsers : [User]
    getUser(id : ID) : User
   
}

type Mutation {
    signup(firstname : String! , lastname : String! , email : String! , password : String!,confirmpassword : String!,role : String!) : User
    login(email : String! ,password : String!) : Token
    
}
`

module.exports = userschema