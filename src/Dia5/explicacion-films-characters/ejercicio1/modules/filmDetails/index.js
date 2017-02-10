import FilmDetailsView from './views/filmDetails';

var filmsDetailsView;

function show(film) {

    showFilmDetailsView(film);
}

function showFilmDetailsView(film) {

    filmsDetailsView = new FilmDetailsView({
        model: film
    });

    filmsDetailsView.on({

        backPressed() {
            Broker.channel('films').request('show');
        }
    });

    Broker.channel('main').request('showView', filmsDetailsView);
}

//
// API
//

var API = {
    show
};

Broker.channel('filmDetails').reply(API);
export default API;