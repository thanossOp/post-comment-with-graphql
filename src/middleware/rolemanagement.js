const { tokenResult } = require('./tokenverify')

const Post = require('../model/post')

const { err, errors } = require('../helper/error')

const Comment = require('../model/comment')

const rolemanagement = async (token, postId) => {

    const user = await tokenResult(token)
    const post = await Post.findOne({ _id: postId })

    if (user.role !== 'admin' && String(user._id) !== String(post.author._id)) {

        err(
            "You are not Authorized",
            errors.UNAUNTHENTICATED
        )

    }

}

const commentrolemanagement = async (token, postId, commentId) => {

    const user = await tokenResult(token)

    const comment = await Comment.findById(commentId).populate('author')
    const post = await Post.findById(postId).populate('author')
    const commentowner = comment.author._id
    const postowner = post.author._id

    if (user.role !== 'admin' && String(user._id) !== String(commentowner) && String(user._id) !== String(postowner)) {
        err(
            "You are not Authorized",
            errors.UNAUNTHENTICATED
        )
    }
}

const adminrole = async (token, postId) => {
    const user = await tokenResult(token)

    if (user.role !== 'admin') {
        err(
            "You are not Authorized",
            errors.UNAUNTHENTICATED
        )
    }
}
module.exports = { rolemanagement, commentrolemanagement, adminrole }
