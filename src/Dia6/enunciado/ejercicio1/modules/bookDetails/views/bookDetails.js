import Template from './bookDetails.html';

const BookDetailsView = Marionette.View.extend({
    template: _.template(Template),
    className: 'book-details-view',
    triggers: {
        'click .back-button': 'onBack'
    },
    ui: {
        header: '.header .title',
        buttonUpdate: '.btn-update',
        title: '#title',
        language: '#language',
        edition: '#edition',
        publisher: '#publisher'
    },
    events: {
        'click .btn-update': 'handleUpdate'
    },
    handleUpdate() {
        this.trigger('onUpdate', getValues(this))
    },
    onRender() {
        const {id} = this.model.attributes;
        if(!id) {
            this.ui.header.html('New Book');
            this.ui.buttonUpdate.html('Add');
        }
    }
})

function getValues (ctx) {
    const title = ctx.ui.title.val();
    const language = ctx.ui.language.val();
    const edition = ctx.ui.edition.val();
    const publisher = ctx.ui.publisher.val();

    return {
        title,
        language,
        edition,
        publisher
    }
}

export default BookDetailsView