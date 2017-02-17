import ProblemsView from './views/problems';
import ProblemsCollectionView from './views/problemsCollectionView';

let layoutView;
let problemsView
let problemsCollectionView;

function show() {
    Broker.channel('CMS').request('getProblems')
        .then((problems) => {
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
    show,
    render
}

Broker.channel('problems').reply(API);
export default API;