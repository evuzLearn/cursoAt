import ProblemDetailsView from './views/problemDetails';
import CommentsCollectionView from './views/commentsCollectionView';

let problemDetailsView;
let commentsCollectionView;

let user;
let comments;

function show(problem) {
    Broker.channel('CMS').request('getComments', problem.get('id'))
        .then((newComments) => {
            comments = newComments;
            user = Broker.channel('CMS').request('getCurrentUser');
            showProblemDetailsView(problem);
            showCommentsView(comments);
        })
        .fail(err => {
            console.error(err);
        })
}

function showProblemDetailsView(problem) {
    problemDetailsView = new ProblemDetailsView({
        model: problem
    })
    problemDetailsView.on({
        onBack() {
            Broker.channel('layout').request('hideRegion', 'right');
        },
        onSolve() {
            problem.set('solved', !problem.get('solved'));
            problemDetailsView.setSolve(problem.get('solved'))
            Broker.channel('CMS').request('saveProblem', problem);
            Broker.channel('problems').request('render');
        },
        onNewComment(inputValue) {
            if(!inputValue) {
                alert('Write a comment!')
            } else {
                let newComment = {
                    author: user,
                    content: inputValue,
                    problemId: problem.get('id')
                }
                Broker.channel('CMS').request('newComment', newComment)
                .then((newComment) => {
                    comments.add(newComment);
                });
            }
        }
    })

    Broker.channel('layout').request('showChildView','right', problemDetailsView);
}

function showCommentsView () {
    // CollectionView...childViewOptions(model,index)
    commentsCollectionView = new CommentsCollectionView({
        user,
        collection: comments
    });

    commentsCollectionView.on('onChildRemove', (ev) => {
        Broker.channel('CMS').request('deleteComment', ev.model);
    });

    problemDetailsView.showChildView('comments', commentsCollectionView);
}

/**
 * API
 */
const API = {
    show
}

Broker.channel('problemDetails').reply(API);
export default API;