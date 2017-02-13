import Films from './models/films';
import Characters from './models/characters';
import Planets from './models/planets'

function getFilmsCollection() {
    return Films.getFilmsCollection();
}

function getCharactersCollection() {
    return Characters.getCharactersCollection();
}

function getPlanetsCollection() {
    return Planets.getPlanetsCollection();
}

//
// API
//

var API = {
    getFilmsCollection,
    getCharactersCollection,
    getPlanetsCollection
};

Broker.channel('CMS').reply(API);
export default API;