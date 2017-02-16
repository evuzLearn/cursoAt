import Template from './problems.html'

const ProblemsView = Marionette.View.extend({
    template: _.template(Template),
    className: 'problems-view',
    regions: {
        content: '.content'
    }
})

export default ProblemsView;