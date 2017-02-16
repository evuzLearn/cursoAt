const Character = Backbone.Model.extend({

});

const Characters = Backbone.Collection.extend({

    model: Character,

    url: 'http://localhost:3030/people/'

    /*
     url: 'http://swapi.co/api/people/',

     parse(data) {
        return data.results;
     }
     */
});

var characters = null;

function getCharactersCollection() {

    var deferred = $.Deferred();

    if(characters) {

        deferred.resolve(characters);

    } else {

        var tempCharacters = new Characters();

        tempCharacters.fetch()
            .then(() => {
                characters = tempCharacters;
                deferred.resolve(characters);
            })
            .fail((e) => {
                deferred.reject(e)
            });
    }

    return deferred.promise();
}

export default {
    getCharactersCollection
};