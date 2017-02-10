import CharacterDetailsView from './views/characterDetails'

function show (model) {
    let characterDetailsView = generateView(model);
    Broker.channel('main').request('showView', characterDetailsView);
}

function generateView (model) {
    let characterDetailsView = new CharacterDetailsView({
        model: model
    });

    return characterDetailsView;
}

let API = {
    show
}

Broker.channel('characterDetails').reply(API);
export default API;