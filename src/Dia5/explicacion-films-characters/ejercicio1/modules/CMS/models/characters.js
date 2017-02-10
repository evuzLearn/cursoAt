const Character = Backbone.Model.extend({

});

const Characters = Backbone.Collection.extend({
    model: Character,
    url: 'http://localhost:3030/people'
});

let characters = null;

function getCharactersCollection() {

    var deferred = $.Deferred();

    if(characters) {
        deferred.resolve(characters);
    } else {
        let tempCharacters = new Characters();

        tempCharacters.fetch()
            .then(() => {
                characters = tempCharacters;
                deferred.resolve(characters);
            })
            .fail(err => {
                deferred.reject(err)
            });
    }
    return deferred.promise();
}

export default {
    getCharactersCollection
};