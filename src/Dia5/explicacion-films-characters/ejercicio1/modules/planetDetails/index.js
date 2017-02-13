import PlanetDetailsView from './views/planetDetails'

function get(model) {
    let planetDetailsView = generateView(model);

    return planetDetailsView;
}

function generateView(model) {
    let planetDetailsView = new PlanetDetailsView({
        model: model
    });
    
    return planetDetailsView;
}

let API = {
    get
}

Broker.channel('planetDetails').reply(API);
export default API;