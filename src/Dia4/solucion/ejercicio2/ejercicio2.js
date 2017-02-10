import _ from 'underscore';
import Backbone from 'backbone';
import Marionette from 'backbone.marionette';

import LayoutViewTemplate from './layoutView.html';
import BookChildViewTemplate from './bookChildView.html';
import BookDetailViewTemplate from './bookDetailView.html';

/*
 * TODO: 1.-
 *   Resuelve el ejercicio anterior pero que se divida la pantalla en 2 sólo
 *   cuando está en tablet. Si está en phone, sólo se mostrará el listado,
 *   o el detalle si se pulsa sobre un elemento de la lista. Se debe disponer
 *   de un botón de atrás para volver al listado (sólo si está en phone).
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

    ui: {
        right: '.right'
    },

    regions: {
        left: '.left',
        right: '.right'
    },

    onAttach() {
        this.setRightRegionPortraitVisible(false);
    },

    setRightRegionPortraitVisible(isVisible) {
        this.ui.right.toggleClass('portrait-hidden', !isVisible);
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

    className: 'book-detail-view',

    triggers: {
        'click .go-back': 'goBackPressed'
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

        var booksCollectionView = new BooksCollectionView({
            collection: books
        });

        booksCollectionView.on('childview:pressed', view => {

            var bookDetailView = new BookDetailView({
                model: view.model
            });

            bookDetailView.on('goBackPressed', () => {
                layoutView.setRightRegionPortraitVisible(false);
            });

            layoutView.showChildView('right', bookDetailView);
            layoutView.setRightRegionPortraitVisible(true);
        });

        var layoutView = new LayoutView();

        app.showView(layoutView);

        layoutView.showChildView('left', booksCollectionView);
    })
    .fail((error) => {
        console.error(error);
    });