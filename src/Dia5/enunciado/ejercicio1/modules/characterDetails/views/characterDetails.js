import Template from './characterDetails.html';

export default Marionette.View.extend({

    template: _.template(Template),

    className: 'character-details',

    triggers: {
        'click .back-button': 'backPressed'
    },

    templateContext: {

        genderIcon: {
            male: 'fa-mars',
            female: 'fa-venus',
            'n/a': 'fa-android'
        }
    }
});