import _ from 'underscore';
import Backbone from 'backbone';
import Marionette from 'backbone.marionette';

import LayoutViewTemplate from './layoutView.html';
import BookChildViewTemplate from './bookChildView.html';
import BookDetailViewTemplate from './bookDetailView.html';

/*
 * TODO: 1.-
 *   Cree un Layout que divida la pantalla verticalmente en dos regiones iguales,
 *   represente en la primera la lista de libros y en la segunda el detalle
 *   del libro que se pulsa
 *
 * TODO: 2.-
 *   Hacer para que se oscurezca el elemento de la lista cuyo detalle
 *   se está mostrando a la derecha
 **/

const Book = Backbone.Model.extend({

});

const Books = Backbone.Collection.extend({
    model: Book,
    url: 'http://localhost:3030/books'
});

const LayoutView = Marionette.View.extend({

    className: 'layout-view',

    template: _.template(LayoutViewTemplate),

    regions: {
        left: '.left',
        right: '.right'
    }
});

const BookChildView = Marionette.View.extend({

    tagName: 'li',

    className: 'book-child-view',

    template: _.template(BookChildViewTemplate),

    triggers: {
        click: 'pressed'
    }
});

const BooksCollectionView = Marionette.CollectionView.extend({

    tagName: 'ul',

    className: 'books-collection-view',

    childView: BookChildView,

    childViewEvents: {
        'pressed': 'bookPressed'
    },

    bookPressed(pressedView) {
        this.children.each(childView => {
            childView.$el.toggleClass('current', childView == pressedView)
        });
    }
});

const BookDetailView = Marionette.View.extend({

    template: _.template(BookDetailViewTemplate),

    className: 'book-detail-view'
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

        booksCollectionView.on('childview:pressed', view => {

            var bookDetailView = new BookDetailView({
                model: view.model
            });

            layoutView.showChildView('right', bookDetailView);
        });

        var layoutView = new LayoutView();

        app.showView(layoutView);

        layoutView.showChildView('left', booksCollectionView);
    })
    .fail((error) => {
        console.error(error);
    });