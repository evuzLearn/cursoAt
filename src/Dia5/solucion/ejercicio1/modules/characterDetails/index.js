import CharacterDetailsView from './views/characterDetails';

var charactersDetailsView;

function show(character) {

    showCharacterDetailsView(character);
}

function showCharacterDetailsView(character) {

    charactersDetailsView = new CharacterDetailsView({
        model: character
    });

    charactersDetailsView.on({

        backPressed() {
            Broker.channel('characters').request('show');
        }
    });

    Broker.channel('main').request('showView', charactersDetailsView);
}

//
// API
//

var API = {
    show
};

Broker.channel('characterDetails').reply(API);
export default API;