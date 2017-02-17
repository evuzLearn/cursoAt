import ProblemsView from './views/problems';
import ProblemsCollectionView from './views/problemsCollectionView';

let layoutView;
let problemsView
let problemsCollectionView;

let user;

function show() {
    Broker.channel('CMS').request('getProblems')
        .then((problems) => {
            user = Broker.channel('CMS').request('getCurrentUser');
            showLayoutView();
            showProblemsView();
            showProblemsCollectionView(problems);
        })
        .fail((err) => {
            console.log(err);
        })
}

function render() {
    problemsCollectionView.render();
}

function showLayoutView() {
    Broker.channel('layout').request('show');
}

function showProblemsView() {
    problemsView = new ProblemsView();

    problemsView.on({
        onLogout() {
            Broker.channel('CMS').request('logout');
        }
    })

    Broker.channel('layout').request('showChildView', 'left', problemsView);
}

function showProblemsCollectionView(problems) {
    problemsCollectionView = new ProblemsCollectionView({
        collection: problems,
        user
    })

    problemsCollectionView.on({
        onChildClick(problem) {
            let notifies = problem.get('notify');

            // Eliminar la notificación,
            if (notifies) {
                console.log(notifies)
                notifies.forEach((notify, index) => {
                    if (notify == user) {
                        notifies.splice(index, 1);
                    }
                })
                Broker.channel('CMS').request('saveProblem', problem);
                problemsCollectionView.render();
            }

            Broker.channel('problemDetails').request('show', problem);
        }
    })

    problemsView.showChildView('content', problemsCollectionView);
}

/**
 * API
 */
const API = {
    show,
    render
}

Broker.channel('problems').reply(API);
export default API;