import CharacterDetailsTemplate from './characterDetails.html';

const CharacterDetailsView = Marionette.View.extend({
    template: _.template(CharacterDetailsTemplate),
    className: 'character-details-view',
    triggers: {
        'click .back-button': 'onBack',
        'click': 'onClick'
    }
});

export default CharacterDetailsView;