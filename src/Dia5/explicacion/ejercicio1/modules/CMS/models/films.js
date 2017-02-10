const Film = Backbone.Model.extend({

});

const Films = Backbone.Collection.extend({

    model: Film,

    url: 'http://localhost:3030/films/'

    /*
    url: 'http://swapi.co/api/films/',

    parse(data) {
        return data.results;
    }
    */
});

var films = null;

function getFilmsCollection() {

    var deferred = $.Deferred();

    if(films) {

        deferred.resolve(films);

    } else {

        var tempFilms = new Films();

        tempFilms.fetch()
            .then(() => {
                films = tempFilms;
                deferred.resolve(films);
            })
            .fail((e) => {
                deferred.reject(e)
            });
    }

    return deferred.promise();
}

export default {
    getFilmsCollection
};