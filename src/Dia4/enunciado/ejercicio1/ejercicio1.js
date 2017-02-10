import _ from 'underscore';
import Backbone from 'backbone';
import Marionette from 'backbone.marionette';

import LayoutTemplate from './layoutView.html';
import BookChildTemplate from './bookChildView.html';
import BookDetailTemplate from './bookDetailView.html';

/*
 * TODO: 1.-
 *   Cree un Layout que divida la pantalla verticalmente en dos regiones iguales,
 *   represente en la primera la lista de libros y en la segunda el detalle
 *   del libro que se pulsa
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
    className: 'book-detail-view'
})

const LayoutView = Marionette.View.extend({
    template: _.template(LayoutTemplate),
    className: 'layout-view',
    regions: {
        right: '.right',
        left: '.left'
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
            this.selected.css('background', 'white');
        }
        this.selected = view.$el;
        view.$el.css('background', 'lightblue')
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
        layoutView.showChildView('right', bookDetailView);
    }
})

books.fetch().then(x => {
    app.showView(layoutView);
    layoutView.showChildView('left', booksView);
})
//When the book is fetched:
