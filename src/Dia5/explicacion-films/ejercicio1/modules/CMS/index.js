import Films from './models/films';

function getFilmsCollection() {
    return Films.getFilmsCollection();
}

//
// API
//

var API = {
    getFilmsCollection
};

Broker.channel('CMS').reply(API);
export default API;