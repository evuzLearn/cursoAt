import Template from './books.html';

const BooksView = Marionette.View.extend({
    template: _.template(Template),
    className: 'books-view',
    triggers: {
        'click .add-button': 'onAdd'
    },
    events: {
        'input #filter': 'handleInputChange',
        'change #order': 'handleSort',
        'click .filter': 'scrollTop',
    },
    childViewEvents: {
        'myAttach': 'handleChildAttach'
    },
    handleChildAttach () {
        console.log('attachBook');
    },
    ui: {
        order: '#order',
        filter: '#filter',
        content: '.content'
    },
    regions: {
        list: '.list'
    },
    handleSort() {
        this.trigger('onSort', this.ui.order.val());
    },
    handleInputChange() {
        this.trigger('onInputChange', this.ui.filter.val());
    }
})

export default BooksView;