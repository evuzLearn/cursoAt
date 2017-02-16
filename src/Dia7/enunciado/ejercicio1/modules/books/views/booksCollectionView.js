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
    initialize(options) {
        const {state} = options;
        if (Object.keys(state).length > 0) {
            const {filter, sort} = state;
            this.collection.comparator = sort || 'id';
            this.setFilter((child) => {
                return (
                    (child.get('title').toUpperCase()
                    .indexOf(filter.toUpperCase()) != -1) || 
                    (child.get('language').toUpperCase()
                    .indexOf(filter.toUpperCase()) != -1)
                );
            });
        }
    },
    childViewEvents: {
        'onClick': 'handleChildClick',
        'onRemove': 'handleChildRemove'
    },
    triggers: {
        'attach': 'myAttach'
    },
    handleChildClick(view) {
        this.trigger('onChildClick', view.model);
    },
    handleChildRemove(view) {
        this.trigger('onChildRemove', view.model);
    },
    onAttach(){
        this.trigger('onAttach');
    }
})

export default BooksCollectionView;