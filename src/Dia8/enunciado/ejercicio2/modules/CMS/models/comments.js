const url = 'http://localhost:3030';

const Comment = Backbone.Model.extend({
    urlRoot: url + '/comments'
})

const Comments = Backbone.Collection.extend({
    url: url + '/comments',
    model: Comment
})

let comments;

function getComments(problemId) {
    let deferred = $.Deferred();
    if (comments) {
        deferred.resolve(comments);
    } else {
        let tempComments = new Comments();
        tempComments.fetch()
            .then(() => {
                comments = tempComments;
                deferred.resolve(comments);
            })
            .fail((err) => {
                deferred.reject(err);
            })
    }

    return deferred.promise()
}

function newComment(comment) {
    let newComment = new Comment(comment);

    let deferred = $.Deferred();

    newComment.save()
        .then(() => {
            comments.add(newComment);
            deferred.resolve(newComment);
        })
        .fail(err => {
            console.error(err)
        });

    return deferred.promise();
}

function deleteComment(comment) {
    return comment.destroy();
}

export default {
    getComments,
    newComment,
    deleteComment
}