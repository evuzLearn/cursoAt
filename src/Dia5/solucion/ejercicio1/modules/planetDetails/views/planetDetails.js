import Template from './planetDetails.html';

export default Marionette.View.extend({

    template: _.template(Template),

    className: 'planet-details',

    triggers: {
        'click .back-button': 'backPressed'
    }
});