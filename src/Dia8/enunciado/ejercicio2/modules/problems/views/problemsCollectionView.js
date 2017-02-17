import Template from './problemsChildView.html';

const ProblemView = Marionette.View.extend({
    template: _.template(Template),
    className: 'problems-child-view',
    tagName: 'li',
    initialize(options) {
        this.user = options.user;
    },
    ui: {
        notification: '.notification-advise'
    },
    user: null,
    templateContext() {
        const {user} = this;
        return {
            formatDate: (date) => {
                date = new Date(date);
                return date.toLocaleDateString();
            },
            isSolved(solved) {
                return solved ? '' : 'hide';
            },
            hasNew(notifies) {
                if (!notifies) return '';
                notifies.forEach(notify => {
                    if (notify == user) {
                        console.log(notify);
                        return 'new-comment';
                    }
                })
            }
        }
    },
    triggers: {
        'click': 'onClick'
    },
    onRender() {
        this.hasNew();
    },
    hasNew() {
        const notifies = this.model.get('notify');
        if (!notifies) return;
        const { user } = this;

        notifies.forEach(notify => {
            if (notify == user) {
                this.ui.notification.addClass('fa-fire');
            }
        })
    }
})

const ProblemsCollectionView = Marionette.CollectionView.extend({
    className: 'problems-collection-view',
    tagName: 'ul',
    childView: ProblemView,
    childViewEvents: {
        onClick(view) {
            this.selectedId = view.model.get('id');
            this.selectProblem();
            this.trigger('onChildClick', view.model);
        }
    },
    childViewOptions() {
        return {
            user: this.options.user
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
        if (this.selectedId) {
            this.selectProblem();
        }
    }
})

export default ProblemsCollectionView;