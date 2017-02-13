import { DoubleLayoutView } from '../layouts';
import Main from '../main';
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
    charactersView = new DoubleLayoutView({
        primaryTitle: 'Characters'
    });
    charactersView.on('primaryBack', () => {
        Broker.channel('dashboard').request('show');
    });

    Main.showView(charactersView);
    // Broker.channel('main').request('showView', charactersView);
}

function showCharactersCollectionView(collection) {
    charactersCollectionView = new CharactersCollectionView({
        collection: collection
    });

    charactersCollectionView.on('childview:onClick', (view) => {

        let characterDetailsView = Broker.channel('characterDetails').request('get', view.model);

        charactersView.on('secondaryBack', () => {
            charactersView.hideContentRight();
            charactersView.hideTitleSecondary();
        });
        charactersView.setSecondaryTitle(characterDetailsView.model.attributes.name);
        charactersView.showChildView('right', characterDetailsView);
        charactersView.showContentRight();
        charactersView.showTitleSecondary();
    })

    charactersView.showChildView('left', charactersCollectionView);
}

//
// API
//
var API = {
    show
};

Broker.channel('characters').reply(API);
export default API;

