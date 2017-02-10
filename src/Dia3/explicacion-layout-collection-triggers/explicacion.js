import _ from 'underscore';
import Backbone from 'backbone';
import Marionette from 'backbone.marionette';

import LayoutTemplate from './layout-view.html';
import BookTemplate from './book-view.html';

const Book = Backbone.Model.extend({

});

const Books = Backbone.Collection.extend({
    model: Book
});

const LayoutView = Marionette.View.extend({

    template: _.template(LayoutTemplate),

    //regions: {
    //    books: '.books'
    //}

    regions: {
        books: {
            selector: '.books',
            replaceElement: true
        }
    }
});

const BookView = Marionette.View.extend({

    tagName: 'li',

    template: _.template(BookTemplate),

    className: 'book-view',

    triggers: {
        click: 'bookPressed'
    }
});

const BooksView = Marionette.CollectionView.extend({

    tagName: 'ul',

    childView: BookView,

    className: 'books-view',

    /*
    childViewEvents: {
        bookPressed: 'childBookPressed'
    },

    childBookPressed(view) {
        this.trigger('childBookPressed', view);
    }
    */

    childViewTriggers: {
        bookPressed: 'childBookPressed'
    }
});

const app = new Marionette.Application({
    region: '#main'
});

app.start();

let book1 = new Book({
    title: 'El código da vinci'
});

let book2 = new Book({
    title: 'El viejo y el mar'
});

let books = new Books([book1, book2]);

let layoutView = new LayoutView();

let booksView = new BooksView({
    collection: books
});

//Events emited directly from the book view
booksView.on('childview:bookPressed', view => {
    console.log(view.model.get('title'));
});

//Events emited from the collection view
booksView.on('childBookPressed', view => {
    console.log('childBookPressed (from controller)', view);
});

app.showView(layoutView);

//layoutView.getRegion('books').show(booksView);

layoutView.showChildView('books', booksView);
