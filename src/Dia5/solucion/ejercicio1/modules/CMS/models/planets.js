const Planet = Backbone.Model.extend({

});

const Planets = Backbone.Collection.extend({

    model: Planet,

    url: 'http://localhost:3030/planets/'

    /*
     url: 'http://swapi.co/api/planets/',

     parse(data) {
        return data.results;
     }
     */
});

var planets = null;

function getPlanetsCollection() {

    var deferred = $.Deferred();

    if(planets) {

        deferred.resolve(planets);

    } else {

        var tempPlanets = new Planets();

        tempPlanets.fetch()
            .then(() => {
                planets = tempPlanets;
                deferred.resolve(planets);
            })
            .fail((e) => {
                deferred.reject(e)
            });
    }

    return deferred.promise();
}

export default {
    getPlanetsCollection
};