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
            this.selectedId = view.model.get('id');
            this.selectProblem();
            this.trigger('onChildClick', view.model);
        }
    },
    selectedId: null,
    selectProblem() {
        this.children.each(child => {
            const childId = child.model.get('id');

            if (childId == this.selectedId) {
                child.$el.addClass('selected');
            } else {
                child.$el.removeClass('selected');
            }
        })
    },
    onRender() {
        if(this.selectedId) {
            this.selectProblem();
        }
    }
})

export default ProblemsCollectionView;