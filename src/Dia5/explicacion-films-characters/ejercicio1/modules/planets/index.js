import { DoubleLayoutView } from '../layouts';
import PlanetsCollectionView from './views/planetsCollectionsView'

let planetsView = null;

function show() {
    Hybreed.UI.showSpinner();

    Broker.channel('CMS').request('getPlanetsCollection')
        .then((planets) => {
            showPlanetsView();
            showPlanetsCollectionView(planets);
        })
        .fail((err) => {
            console.error(err);
        })
        .always(() => {
            Hybreed.UI.hideSpinner();
        });
}

function showPlanetsView() {
    planetsView = new DoubleLayoutView({
        primaryTitle: 'Planets'
    });

    planetsView.on('primaryBack', () => {
        Broker.channel('dashboard').request('show');
    })

    Broker.channel('main').request('showView', planetsView);
}

function showPlanetsCollectionView (planets) {
    let planetsCollectionView = new PlanetsCollectionView({
        collection: planets
    });

    planetsCollectionView.on('childview:onClick', (view) => {
        let planetDetailsView = Broker.channel('planetDetails').request('get', view.model);
        console.log('oooo')
        planetsView.showChildView('right', planetDetailsView);
    });

    planetsView.showChildView('left', planetsCollectionView);
}

/**
 * API
 */
const API = {
    show
}

Broker.channel('planets').reply(API);
export default API;