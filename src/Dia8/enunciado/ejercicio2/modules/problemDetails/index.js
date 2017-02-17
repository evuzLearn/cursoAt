import ProblemDetailsView from './views/problemDetails';
import CommentsCollectionView from './views/commentsCollectionView';

let problemDetailsView;
let commentsCollectionView;

let user;

function show(problem) {
    Broker.channel('CMS').request('getComments', problem.get('id'))
        .then((comments) => {
            user = Broker.channel('CMS').request('getCurrentUser');
            showProblemDetailsView(problem);
            showCommentsView(problem, comments);
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
            if (!inputValue) {
                alert('Write a comment!')
            } else {
                let newComment = {
                    author: user,
                    content: inputValue,
                    problemId: problem.get('id')
                }

                // Crear notificación
                commentsCollectionView.children.each((child) => {
                    const childAuthor = child.model.get('author');

                    if (childAuthor != user) {
                        let notify = problem.get('notify') || [];
                        notify.push(childAuthor);
                        problem.set('notify', notify);
                    }
                })

                Broker.channel('CMS').request('saveProblem', problem);
                Broker.channel('CMS').request('newComment', newComment);
            }
        },
        onLogout() {
            Broker.channel('CMS').request('logout');
        }
    })

    Broker.channel('layout').request('showChildView', 'right', problemDetailsView);
}

function showCommentsView(problem, comments) {
    commentsCollectionView = new CommentsCollectionView({
        user,
        problemId: problem.get('id'),
        problemAuthor: problem.get('author'),
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