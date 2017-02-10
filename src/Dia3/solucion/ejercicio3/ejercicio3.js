import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';
import Marionette from 'backbone.marionette';

import BookChildViewTemplate from './bookChildView.html';
import BooksViewTemplate from './booksView.html';

/*
 * TODO: 1.-
 *   Haga el ejercicio2 pero usando una tabla (en vez de una lista),
 *   con las columnas Title, Language, Edition y Publisher.
 *
 * TODO: 2.-
 *   Añada funcionalidad para los libros ascendentemente según la cabecera de la tabla donde se pulse
 */

const Book = Backbone.Model.extend({

});

const Books = Backbone.Collection.extend({
    model: Book,
    url: 'http://localhost:3030/books'
});

const BookView = Marionette.View.extend({

    tagName: 'tr',

    className: 'book-child-view',

    template: _.template(BookChildViewTemplate)
});

const BooksCollectionView = Marionette.CollectionView.extend({

    tagName: 'tbody',

    childView: BookView
});

const BooksView = Marionette.View.extend({

    template: _.template(BooksViewTemplate),

    className: 'books-view',

    regions: {
        tableBody: {
            selector: 'tbody',
            replaceElement: true
        }
    },

    ui: {
        filter: '.filter'
    },

    events: {
        'keyup @ui.filter': 'filterChanged',
        'click th': 'headerPressed'
    },

    filterChanged() {
        this.trigger('filterChanged', this.ui.filter.val().toLowerCase());
    },

    headerPressed(ev) {
        this.trigger('sortCriteriaChanged', $(ev.target).data('sortCriteria'));
    }
});

///

const app = new Marionette.Application({
    region: '#main'
});

app.start();

var books = new Books();

books.fetch()
    .then(() => {

        //Show the books layout view

        var booksView = new BooksView();

        app.showView(booksView);

        //Show the books collection view in the layout

        var booksCollectionView = new BooksCollectionView({
            collection: books
        });

        booksView.showChildView('tableBody', booksCollectionView);

        //Associate events

        booksView.on({

            filterChanged(filter) {

                booksCollectionView.setFilter(book => {
                    return book.get('title').toLowerCase().includes(filter);
                });
            },

            sortCriteriaChanged(sortCriteria) {
                booksCollectionView.viewComparator = sortCriteria;
                booksCollectionView.render();
            }
        });
    })
    .fail((error) => {
        console.error(error);
    });