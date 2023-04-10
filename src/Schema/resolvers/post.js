const { default: gql } = require('graphql-tag')

const Post = require('../../model/post')

const { tokenResult } = require('../../middleware/tokenverify')

const { rolemanagement } = require('../../middleware/rolemanagement')

const post = {
    Query: {
        getAllPost: async (parent, args, context) => {
            const { token } = context

            await tokenResult(token)
            const posts = await Post.find({})
            return posts
        },
        getPost: async (parent, args, context) => {
            const id = args.id

            const { token } = context

            await tokenResult(token)

            const post = await Post.findById(id)
            return post
        }

    },
    Mutation: {

        addPost: async (parent, args, context) => {

            const { token } = context

            const user = await tokenResult(token)
            const newpost = new Post({
                post_name: args.post_name,
                caption: args.caption,
                author: user
            })

            const addpost = await newpost.save()
            return addpost
        },
        updatePost: async (parent, args, context) => {

            const { token } = context

            const postId = args.id

            await rolemanagement(token, postId)

            const updatedPost = await Post.findOneAndUpdate({ _id: postId }, {
                $set:
                {
                    post_name: args.post_name,
                    caption: args.caption
                }
            }, {
                new: true
            })

            return updatedPost
        },
        deletePost: async (parent, args, context) => {

            const { token } = context


            const postId = args.id

            await rolemanagement(token, postId)


            const deletepost = await Post.findByIdAndUpdate({ _id: postId }, {
                $set: {
                    isDeleted: true
                }
            }, {
                new: true
            })

            return deletepost
        }
    }
}

module.exports = post