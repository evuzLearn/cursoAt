import CharactersView from './views/characters';
import CharactersCollectionView from './views/charactersCollection';

var charactersView;
var charactersCollectionView;

function show() {

    Hybreed.UI.showSpinner();

    Broker.channel('CMS').request('getCharactersCollection')
        .then(characters => {
            showCharactersView();
            showCharactersCollectionView(characters);
        })
        .fail(error => {
            console.error(error);
        })
        .always(() => {
            Hybreed.UI.hideSpinner();
        });
}

function showCharactersView() {

    charactersView = new CharactersView();

    charactersView.on({

        backPressed() {
            Broker.channel('dashboard').request('show');
        }
    });

    Broker.channel('main').request('showView', charactersView);
}

function showCharactersCollectionView(characters) {

    charactersCollectionView = new CharactersCollectionView({
        collection: characters
    });

    charactersCollectionView.on({

        characterPressed(character) {
            Broker.channel('characterDetails').request('show', character);
        }
    });

    charactersView.showChildView('content', charactersCollectionView);
}

//
// API
//

var API = {
    show
};

Broker.channel('characters').reply(API);
export default API;