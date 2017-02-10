import CharacterTemplate from './characters.html';

const CharactersView = Marionette.View.extend({
    template: _.template(CharacterTemplate),
    className: 'characters-view',
    regions: {
        list: '.list'
    },
    triggers: {
        'click .back-button': 'onBack'
    }
});

export default CharactersView;