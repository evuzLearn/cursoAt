import _ from 'underscore';
import Backbone from 'backbone';
import Marionette from 'backbone.marionette';

import LayoutTemplate from './layoutView.html';
import BookChildTemplate from './bookChildView.html';
import BookDetailTemplate from './bookDetailView.html';

/*
 * TODO: 1.-
 *   Resuelve el ejercicio anterior pero que se divida la pantalla en 2 sólo
 *   cuando está en tablet. Si está en phone, sólo se mostrará el listado,
 *   o el detalle si se pulsa sobre un elemento de la lista. Se debe disponer
 *   de un botón de atrás para volver al listado (sólo si está en phone).
 **/

const Book = Backbone.Model.extend({

})

const Books = Backbone.Collection.extend({
    model: Book,
    url: 'http://localhost:3030/books'
})

const BookChildView = Marionette.View.extend({
    template: _.template(BookChildTemplate),
    className: 'book-child-view',
    triggers: {
        'click': 'onClick'
    }
})

const BookDetailView = Marionette.View.extend({
    template: _.template(BookDetailTemplate),
    className: 'book-detail-view',
    triggers: {
        'click .btn-back': 'onBack'
    }
})

const LayoutView = Marionette.View.extend({
    template: _.template(LayoutTemplate),
    className: 'layout-view',
    regions: {
        right: '.right',
        left: '.left'
    },
    ui: {
        right: '.right',
        left: '.left'
    },
    hideRightView() {
        this.ui.right.removeClass('portrait-hidden');
    },
    showRightView() {
        this.ui.right.addClass('portrait-hidden');
    }
})

const BooksView = Marionette.CollectionView.extend({
    className: 'books-collection-view',
    childView: BookChildView,
    childViewEvents: {
        'onClick': 'handleChildClick'
    },
    selected: null,
    handleChildClick(view) {
        if(this.selected) {
            this.selected.removeClass('select');
        }
        this.selected = view.$el;
        view.$el.addClass('select')
        // $(ev.target).css('background', 'lightblue');
    }
})
///
const app = new Marionette.Application({
    region: '#main'
});

app.start();

let books = new Books();

let layoutView = new LayoutView();
let booksView = new BooksView({
    collection: books
});

booksView.on({
    'childview:onClick'(view) {
        let bookDetailView = new BookDetailView({
            model: view.model
        });

        bookDetailView.on('onBack', () => {
          layoutView.showRightView();
        })

        layoutView.showChildView('right', bookDetailView);
        layoutView.hideRightView();
    }
})

books.fetch().then(x => {
    app.showView(layoutView);
    layoutView.showChildView('left', booksView);
})
//When the book is fetched:
