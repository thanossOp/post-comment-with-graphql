const Comment = require('../../model/comment')

const Post = require('../../model/post')

const { err, errors } = require('../../helper/error')

const { tokenResult } = require('../../middleware/tokenverify')

const { commentrolemanagement } = require('../../middleware/rolemanagement')

const commentresolver = {

    Query: {
        getAllComment: async (parents, args, context) => {

            const { token } = context

            await tokenResult(token)

            const post = args.postId
            if (post) {
                const comments = await Comment.find({ postOwner: post })
                return comments
            } else {
                err(
                    "Post Not Found",
                    errors.NOT_FOUND
                )
            }



        },
    },
    Mutation: {
        addComment: async (parent, args, context) => {
            const { token } = context
            const user = await tokenResult(token)
            const post = await Post.findById(args.postId)
            const postowner = post._id

            const newcomment = new Comment({
                comment: args.comment,
                postOwner: postowner,
                author: user
            })

            const addComment = await newcomment.save()
            return addComment

        },
        updateComment: async (parent, args, context) => {
            const { token } = context

            const postId = args.postId
            const commentId = args.commentId
            await commentrolemanagement(token, postId, commentId)

            const post = await Post.findById(postId)
            if (!post) {
                err(
                    "Post Not Found",
                    errors.NOT_FOUND
                )
            }
            const updatecomment = await Comment.findByIdAndUpdate({ _id: commentId }, {
                $set: {
                    comment: args.comment
                }
            }, {
                new: true
            })
            return updatecomment
        },
        deleteComment: async (parent, args, context) => {

            const { token } = context
            const postId = args.postId
            const commentId = args.commentId
            await commentrolemanagement(token, postId, commentId)

            const deletecomment = await Comment.findByIdAndUpdate({ _id: commentId }, {
                $set: {
                    isDeleted: true
                }
            }, {
                new: true
            })

            return deletecomment


        }
    }

}

module.exports = commentresolver