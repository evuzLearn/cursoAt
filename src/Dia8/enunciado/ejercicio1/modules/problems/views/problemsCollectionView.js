import Template from './problemsChildView.html';

const ProblemView = Marionette.View.extend({
    template: _.template(Template),
    className: 'problems-child-view',
    tagName: 'li',
    templateContext: {
        formatDate: (date) => {
            date = new Date(date);
            return date.toLocaleDateString();
        },
        isSolved(solved) {
            return solved ? '' : 'hide';
        }
    },
    triggers: {
        'click': 'onClick'
    }
})

const ProblemsCollectionView = Marionette.CollectionView.extend({
    className: 'problems-collection-view',
    tagName: 'ul',
    childView: ProblemView,
    childViewEvents: {
        onClick (view) {
            this.trigger('onChildClick', view.model);
        }
    }
})

export default ProblemsCollectionView;