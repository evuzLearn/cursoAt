import Template from './books.html';

const BooksView = Marionette.View.extend({
    template: _.template(Template),
    className: 'books-view',
    triggers: {
        'click .add-button': 'onAdd'
    },
    initialize(options) {
        const { state } = options;

        this.state = state;
    },
    state: {},
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
    onBeforeDetach() {
        this.state.filter = this.ui.filter.val();
        this.state.sort = this.ui.order.val();
        this.state.scrollTop = this.ui.content.scrollTop();
    },
    handleSort() {
        this.trigger('onSort', this.ui.order.val());
    },
    handleInputChange() {
        this.trigger('onInputChange', this.ui.filter.val());
    },
    onRender() {
        const {filter, sort, scrollTop} = this.state;
        this.ui.filter.val(filter || '');
        this.ui.order.val(sort || '');
    },
    setScrollTop() {
        const {scrollTop} = this.state;
        this.ui.content.scrollTop(scrollTop);
    }
})

export default BooksView;