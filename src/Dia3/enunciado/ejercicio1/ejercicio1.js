import _ from 'underscore';
import Backbone from 'backbone';
import Marionette from 'backbone.marionette';

import BookTemplate from './bookChildView.html'

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
})

const BookView = Marionette.View.extend({
    template: _.template(BookTemplate),
    className: 'book-view',
    triggers: {
        'click': 'onClick',
        'click .remove': 'onRemove'
    }
})

const BooksView = Marionette.CollectionView.extend({
    className: 'books-view',
    childView: BookView
})

///
const app = new Marionette.Application({
    region: '#main'
});

app.start();

let books = new Books();

books.fetch().then(() => {
    let booksView = new BooksView({
        collection: books
    })
    booksView.on('childview:onClick', (data) => {
        const {title, language, edition, publisher} = data.model.attributes;
        const str = `Title: ${title}\n` +
            `Language: ${language}\n` + 
            `Edition: ${edition}\n` + 
            `Publiser: ${publisher}\n`;
        alert(str);
    });
    booksView.on('childview:onRemove', (data) => {
        let collection = booksView.collection;
        const model = data.model; 
        collection.remove(model);
    });
    app.showView(booksView);
});

//When the book collection is fetched:
//app.showView(booksCollectionView);