import childTemplate from './bookChildView.html';

const BookView = Marionette.View.extend({
    template: _.template(childTemplate),
    className: 'books-child-view',
    triggers: {
        'click': 'onClick',
        'click .btn-remove': 'onRemove'
    }
});

const BooksCollectionView = Marionette.CollectionView.extend({
    childView: BookView,
    className: 'books-collection-view',
    childViewEvents: {
        'onClick': 'handleChildClick',
        'onRemove': 'handleChildRemove'
    },
    triggers: {
        'attach': 'myAttach'
    },
    selectCurrentBook(view) {
        this.selected = view ? view.model.get('id') : null;
        this.children.each(child => {
            child.$el.removeClass('select');
        })
        if (view) {
            view.$el.addClass('select');
        }
    },
    selectBookById(view) {
        this.children.each(child => {
            const childId = child.model.get('id');
            if (childId == this.selected) {
                child.$el.addClass('select');
            }
        })
    },
    onRender() {
        if (this.selected) {
            this.selectBookById(this.selected);
        }
    },
    selected: null,
    handleChildClick(view) {
        this.selected = view.model.get('id');
        this.selectCurrentBook(view);
        this.trigger('onChildClick', view.model);
    },
    handleChildRemove(view) {
        this.trigger('onChildRemove', view.model);
    },
    setSelect(id) {
        this.selected = id;
    }
})

export default BooksCollectionView;