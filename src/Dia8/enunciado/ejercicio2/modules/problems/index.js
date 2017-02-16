import ProblemsView from './views/problems';
import ProblemsCollectionView from './views/problemsCollectionView';

let problemsView
let problemsCollectionView;

function show () {
    Broker.channel('CMS').request('getProblems')
        .then((problems) => {
            showProblemsView();
            showProblemsCollectionView(problems);
        })
        .fail((err) => {
            console.log(err);
        })
}

function showProblemsView() {
    problemsView = new ProblemsView();

    Broker.channel('main').request('showView', problemsView);
}

function showProblemsCollectionView(problems) {
    problemsCollectionView = new ProblemsCollectionView({
        collection: problems
    })

    problemsCollectionView.on({
        onChildClick(problem) {
            Broker.channel('problemDetails').request('show', problem);
        }
    })

    problemsView.showChildView('content', problemsCollectionView);
}

/**
 * API
 */
const API = {
    show
}

Broker.channel('problems').reply(API);
export default API;