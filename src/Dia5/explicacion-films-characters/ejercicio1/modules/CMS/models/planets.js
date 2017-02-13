const Planet = Backbone.Model.extend({

});

const Planets = Backbone.Collection.extend({
    model: Planet,
    url: 'http://localhost:3030/planets'
});

let planets = null;

function getPlanetsCollection () {

    let deferred = $.Deferred();

    if(planets) {
        deferred.resolve(planets);
    } else {
        let tempPlanets = new Planets();

        tempPlanets.fetch()
            .then( () => {
                planets = tempPlanets;
                deferred.resolve(planets);
            })
            .fail((err) => {
                deferred.reject(err);
            });
    }

    return deferred.promise();
}

export default {
    getPlanetsCollection
}