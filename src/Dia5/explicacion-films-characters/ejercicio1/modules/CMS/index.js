import Films from './models/films';
import Characters from './models/characters';

function getFilmsCollection() {
    return Films.getFilmsCollection();
}

function getCharactersCollection() {
    return Characters.getCharactersCollection();
}

//
// API
//

var API = {
    getFilmsCollection,
    getCharactersCollection
};

Broker.channel('CMS').reply(API);
export default API;