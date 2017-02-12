import CharactersView from './views/characters';
import CharactersCollectionView from './views/charactersCollection';

let charactersView = null;
let charactersCollectionView = null;

function show() {
    Hybreed.UI.showSpinner();

    Broker.channel('CMS').request('getCharactersCollection')
        .then(char => {
            showCharactersView();
            showCharactersCollectionView(char);
        }).fail(err => {
            console.error(err);
        }).always(() => {
            Hybreed.UI.hideSpinner();
        });
}

function showCharactersView() {
    charactersView = new CharactersView();

    charactersView.on('onBack', () => {
        Broker.channel('dashboard').request('show');
    });

    Broker.channel('main').request('showView', charactersView);
}

function showCharactersCollectionView(collection) {
    charactersCollectionView = new CharactersCollectionView({
        collection: collection
    });

    charactersCollectionView.on('childview:onClick', (view) => {

        let characterDetailsView = Broker.channel('characterDetails').request('get', view.model);

        characterDetailsView.on('onClick', () => {
            charactersView.hideDetails();
        })
        // charactersView.off('onBack');
        // charactersView.on('onBack', () => {
        //     charactersView.hideDetails();

        //     charactersView.off('onBack');
        //     charactersView.on('onBack', () => {
        //         Broker.channel('dashboard').request('show');
        //     });
        // });

        charactersView.showChildView('details', characterDetailsView);
        charactersView.showDetails();
    })

    charactersView.showChildView('list', charactersCollectionView);
}

//
// API
//
var API = {
    show
};

Broker.channel('characters').reply(API);
export default API;

