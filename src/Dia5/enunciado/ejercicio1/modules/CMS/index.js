import Characters from './models/characters';
import Films from './models/films';

function getCharactersCollection() {
    return Characters.getCharactersCollection();
}

function getFilmsCollection() {
    return Films.getFilmsCollection();
}

//
// API
//

var API = {
    getCharactersCollection,
    getFilmsCollection
};

Broker.channel('CMS').reply(API);
export default API;