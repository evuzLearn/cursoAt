import PlanetDetailsView from './views/planetDetails';

var planetsDetailsView;

function show(planet) {

    showPlanetDetailsView(planet);
}

function showPlanetDetailsView(planet) {

    planetsDetailsView = new PlanetDetailsView({
        model: planet
    });

    planetsDetailsView.on({

        backPressed() {
            Broker.channel('planets').request('show');
        }
    });

    Broker.channel('main').request('showView', planetsDetailsView);
}

//
// API
//

var API = {
    show
};

Broker.channel('planetDetails').reply(API);
export default API;