import Template from './dashboard.html';

export default Marionette.View.extend({

    template: _.template(Template),

    className: 'dashboard',

    events: {
        'click button': 'optionPressed'
    },

    optionPressed(ev) {
        this.trigger('optionPressed', $(ev.target).data('module'));
    }
});