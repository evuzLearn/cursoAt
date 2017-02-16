import PlanetsView from './views/planets';
import PlanetsCollectionView from './views/planetsCollection';

var planetsView;
var planetsCollectionView;

function show() {

    Hybreed.UI.showSpinner();

    Broker.channel('CMS').request('getPlanetsCollection')
        .then(planets => {
            showPlanetsView();
            showPlanetsCollectionView(planets);
        })
        .fail(error => {
            console.error(error);
        })
        .always(() => {
            Hybreed.UI.hideSpinner();
        });
}

function showPlanetsView() {

    planetsView = new PlanetsView();

    planetsView.on({

        backPressed() {
            Broker.channel('dashboard').request('show');
        }
    });

    Broker.channel('main').request('showView', planetsView);
}

function showPlanetsCollectionView(planets) {

    planetsCollectionView = new PlanetsCollectionView({
        collection: planets
    });

    planetsCollectionView.on({

        planetPressed(planet) {
            Broker.channel('planetDetails').request('show', planet);
        }
    });

    planetsView.showChildView('content', planetsCollectionView);
}

//
// API
//

var API = {
    show
};

Broker.channel('planets').reply(API);
export default API;