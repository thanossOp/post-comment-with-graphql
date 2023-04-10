const { gql } = require('graphql-tag')

require('./user')

const postschema = gql`

type Post {
    id : ID!
    post_name  : String!
    caption : String!
    isDeleted : Boolean
    author : User! 
    deletedBy : User!

}

type Query {
    getAllPost : [Post!]!
    getPost(id:ID) : Post
}


type Mutation {
    addPost(post_name:String!, caption : String!) : Post
    updatePost(id:ID!,post_name:String!,caption:String!):Post
    deletePost(id:ID!) : Post
}
`
module.exports = postschema