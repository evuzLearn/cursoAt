import CharacterDetailsView from './views/characterDetails'

function show(model) {
    let characterDetailsView = generateView(model);

    Broker.channel('main').request('showView', characterDetailsView);
}

function get(model) {
    let characterDetailsView = generateView(model);

    return characterDetailsView;
}

function generateView(model) {
    let characterDetailsView = new CharacterDetailsView({
        model: model
    });

    characterDetailsView.on('onBack', () => {
        Broker.channel('characters').request('show');
    })

    return characterDetailsView;
}

let API = {
    show,
    get
}

Broker.channel('characterDetails').reply(API);
export default API;