import Characters from './models/characters';
import Films from './models/films';
import Planets from './models/planets';

function getCharactersCollection() {
    return Characters.getCharactersCollection();
}

function getFilmsCollection() {
    return Films.getFilmsCollection();
}

function getPlanetsCollection() {
    return Planets.getPlanetsCollection();
}

//
// API
//

var API = {
    getCharactersCollection,
    getFilmsCollection,
    getPlanetsCollection
};

Broker.channel('CMS').reply(API);
export default API;