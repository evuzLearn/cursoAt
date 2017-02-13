import FilmsView from './views/films';
import FilmsCollectionView from './views/filmsCollection';

var filmsView;
var filmsCollectionView;

function show() {

    Hybreed.UI.showSpinner();

    Broker.channel('CMS').request('getFilmsCollection')
        .then(films => {
            showFilmsView();
            showFilmsCollectionView(films);
        })
        .fail(error => {
            console.error(error);
        })
        .always(() => {
            Hybreed.UI.hideSpinner();
        });
}

function showFilmsView() {

    filmsView = new FilmsView();

    filmsView.on({

        backPressed() {
            Broker.channel('dashboard').request('show');
        }
    });

    Broker.channel('main').request('showView', filmsView);
}

function showFilmsCollectionView(films) {

    filmsCollectionView = new FilmsCollectionView({
        collection: films
    });

    filmsCollectionView.on({

        filmPressed(film) {
            Broker.channel('filmDetails').request('show', film);
        }
    });

    filmsView.showChildView('list', filmsCollectionView);
}

//
// API
//

var API = {
    show
};

Broker.channel('films').reply(API);
export default API;