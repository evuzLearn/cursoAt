const Comment = Backbone.Model.extend({
    urlRoot: 'http://localhost:3030/comments'
})

const Comments = Backbone.Collection.extend({
    url: 'http://localhost:3030/comments',
    model: Comment
})

let comments;

function getComments(problemId) {
    let deferred = $.Deferred();
    if (comments) {
        const commentsFiltered = new Comments(
            filterComments(problemId)
        );
        deferred.resolve(commentsFiltered);
    } else {
        let tempComments = new Comments();
        tempComments.fetch()
            .then(() => {
                comments = tempComments;
                const commentsFiltered = new Comments(
                    filterComments(problemId)
                );
                deferred.resolve(commentsFiltered);
            })
            .fail((err) => {
                deferred.reject(err);
            })
    }

    return deferred.promise()
}

function filterComments(problemId) {
    return comments.filter(comment => {
        return comment.get('problemId') == problemId;
    })
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