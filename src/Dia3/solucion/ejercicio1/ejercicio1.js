import _ from 'underscore';
import Backbone from 'backbone';
import Marionette from 'backbone.marionette';

import BookChildViewTemplate from './bookChildView.html';

/*
 * TODO: 1.-
 *   Recupere de servidor los libros y muestre un listado de ellos en el que aparezca el título y lenguaje:
 *   Use db.json - books
 *
 * TODO: 2.-
 *   Asocie un evento que al pulsar sobre sobre cada libro muestre un alert con la información del libro
 *
 * TODO: 3.-
 *   Añada en la parte derecha de cada libro una opción para eliminar el libro. Elimine el libro de la
 *   de la colección pero no de servidor.
 *
 **/

const Book = Backbone.Model.extend({

});

const Books = Backbone.Collection.extend({
    model: Book,
    url: 'http://localhost:3030/books'
});


const BookChildView = Marionette.View.extend({

    tagName: 'li',

    className: 'book-child-view',

    template: _.template(BookChildViewTemplate),

    triggers: {
        click: 'bookPressed'
    },

    events: {
        'click .remove': 'removeBook'
    },

    removeBook(ev) {
        this.trigger('removeBook', this.model);
        ev.stopPropagation();
    }
});

const BooksCollectionView = Marionette.CollectionView.extend({

    tagName: 'ul',

    className: 'books-collection-view',

    childView: BookChildView
});

///

const app = new Marionette.Application({
    region: '#main'
});

app.start();

var books = new Books();

books.fetch()
    .then(() => {

        var booksCollectionView = new BooksCollectionView({
            collection: books
        });

        booksCollectionView.on({

            'childview:bookPressed'(view) {
                alert(JSON.stringify(view.model));
            },

            'childview:removeBook'(book) {
                books.remove(book);
            }
        });

        app.showView(booksCollectionView);
    })
    .fail((error) => {
        console.error(error);
    });