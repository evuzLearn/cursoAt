import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import _ from 'underscore';

import BookTemplate from './bookView.html';

const Book = Backbone.Model.extend({

});

const Books = Backbone.Collection.extend({
    model: Book
});

const BookView = Marionette.View.extend({
    template: _.template(BookTemplate),
    className: 'layout-view',
    tagName: 'li'
});

const BooksView = Marionette.CollectionView.extend({
    className: 'books-view',
    childView: BookView,
    tagName: 'ul'
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

console.log(books)

let booksView = new BooksView({
    collection: books
});

app.showView(booksView);
