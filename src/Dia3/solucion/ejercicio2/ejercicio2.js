import _ from 'underscore';
import Backbone from 'backbone';
import Marionette from 'backbone.marionette';

import BookChildViewTemplate from './bookChildView.html';
import BooksViewTemplate from './booksView.html';

/*
 * TODO: 1.-
 * Se pretende hacer el ejercicio1, pero esta vez la pantalla tendría 3 elementos:
 *   - Campo de filtro de libros
 *   - Botón para ordenar según título
 *   - Lista de libros
 *
 * Para simplificar, puede quitar la lógica de mostrar la información de un libro
 * o borrarlo
 *
 * TODO: 2.-
 *   Provea de funcionalidad al filtro para que cuando se escriba sobre él se filtre la colección
 *   mostrando aquellos libros cuyos títulos cumplen el filtro
 *
 * TODO: 3.-
 *   Provea de funcionalidad al botón de ordenar para que cuando se pulse, ordene la lista de libros
 *   por título ascendentemente
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

    template: _.template(BookChildViewTemplate)
});

const BooksCollectionView = Marionette.CollectionView.extend({

    tagName: 'ul',

    className: 'books-collection-view',

    childView: BookChildView
});

const BooksView = Marionette.View.extend({

    className: 'books-view',

    template: _.template(BooksViewTemplate),

    regions: {
        list: '.list'
    },

    ui: {
        filter: '.filter'
    },

    events: {
        'keyup @ui.filter': 'filterChanged'
    },

    triggers: {
        'click .order': 'orderPressed'
    },

    filterChanged() {
        this.trigger('filterChanged', this.ui.filter.val().toLowerCase());
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

        booksView.showChildView('list', booksCollectionView);

        //Associate events

        booksView.on({

            filterChanged(filter) {

                booksCollectionView.setFilter(book => {
                    return book.get('title').toLowerCase().includes(filter);
                });
            },

            orderPressed() {
                booksCollectionView.viewComparator = 'title';
                booksCollectionView.render();
            }
        });
    })
    .fail((error) => {
        console.error(error);
    });