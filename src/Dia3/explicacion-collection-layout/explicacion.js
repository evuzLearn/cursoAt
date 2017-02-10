import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import _ from 'underscore';

import BookTemplate from './bookView.html';
import LAyoutTemplate from './layout-view.html';

const Book = Backbone.Model.extend({

});

const Books = Backbone.Collection.extend({
    model: Book
});

const BookView = Marionette.View.extend({
    template: _.template(BookTemplate),
    tagName: 'li',
    className: 'book-view',
});

const LayoutView = Marionette.View.extend({
    template: _.template(LAyoutTemplate),
    className: 'layout-view',
    regions: {
        books: '.books'
    },
    books: null,
    initialize(options) {
        this.books = options.books;
    },
    onRender() {
        let booksView = new BooksView({
            collection: this.books
        });
        this.getRegion('books').show(booksView);
    }
})

const BooksView = Marionette.CollectionView.extend({
    tagName: 'ul',
    className: 'books-view',
    childView: BookView
});

const app = new Marionette.Application({
    region: '#main'
})

app.start();

let book1 = new Book({
    title: 'El código Da Vinci'
})

let book2 = new Book({
    title: 'Elantris'
})

let books = new Books([book1, book2]);

let layoutView = new LayoutView({
    books: books
});

app.showView(layoutView);
