import CharactersViewTemplate from './characters.html';

const CharacterView = Marionette.View.extend({

    template: _.template(CharactersViewTemplate),

    className: 'characters-view',

    regions: {
        content: '.content'
    },

    triggers: {
        'click .back-button': 'backPressed'
    }
});

export default CharacterView;