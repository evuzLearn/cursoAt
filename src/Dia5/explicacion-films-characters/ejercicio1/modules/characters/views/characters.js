import CharacterTemplate from './characters.html';

const CharactersView = Marionette.View.extend({
    template: _.template(CharacterTemplate),
    className: 'characters-view',
    ui: {
        details: '.details'
    },
    regions: {
        list: '.list',
        details: '.details'
    },
    triggers: {
        'click .back-button': 'onBack'
    },
    showDetails() {
        this.ui.details.removeClass('portrait-hidden');
    },
    hideDetails() {
        this.ui.details.addClass('portrait-hidden');
    }
});

export default CharactersView;