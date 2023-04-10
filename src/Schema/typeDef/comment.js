const { gql } = require('graphql-tag')

const commentschema = gql`

    type Comment {
        id : ID!
        comment : String!
        isDeleted : Boolean
        postOwner : String
        author : User! 
    }

    type Query {
        getAllComment(postId:ID!) : [Comment!]!
    }

    type Mutation {
        addComment(postId : ID!,comment : String!) : Comment
        updateComment(postId:ID!,commentId : ID!,comment:String!):Comment
        deleteComment(postId:ID!,commentId : ID!,isDeleted:String) : Comment
    }

`

module.exports = commentschema