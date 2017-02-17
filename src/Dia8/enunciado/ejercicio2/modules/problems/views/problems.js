import Template from './problems.html'

const ProblemsView = Marionette.View.extend({
    template: _.template(Template),
    className: 'problems-view data-problem',
    regions: {
        content: '.content'
    },
    triggers: {
        'click .btn-logout': 'onLogout'
    }
})

export default ProblemsView;