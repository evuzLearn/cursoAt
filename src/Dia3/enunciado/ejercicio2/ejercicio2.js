import _ from 'underscore';
import Backbone from 'backbone';
import Marionette from 'backbone.marionette';

import BookTemplate from './bookChildView.html';
import LayoutTemplate from './booksView.html';

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

const BookView = Marionette.View.extend({
    template: _.template(BookTemplate),
    className: 'book-child-view',
    tagName: 'li',
    triggers: {
        'click': 'onClick',
        'click .remove': 'onRemove'
    }
});

const LayoutView = Marionette.View.extend({
    template: _.template(LayoutTemplate),
    className: 'books-view',
    regions: {
        list: '.books-view'
    },
    ui: {
        filter: '#filter',
        order: '#order'
    },
    orderByTitle : false,
    events: {
        'input #filter': 'handleChange',
        'click .btn-order': 'handleOrder'
    },
    handleOrder() {
        this.orderByTitle = !this.orderByTitle;

        this.ui.order.html(this.orderByTitle ? 'Order by ID' : 'Order by title');
        this.trigger('onOrder', this.orderByTitle);
    },
    handleChange() {
        this.trigger('onChange', this.ui.filter.val());
    }
});

const BooksView = Marionette.CollectionView.extend({
    className: 'books-collection-view',
    tagName: 'ul',
    childView: BookView
});

///
const app = new Marionette.Application({
    region: '#main'
});

app.start();

let books = new Books();

let layoutView = new LayoutView();

layoutView.on('onOrder', (orderByTitle) => {
    books.comparator = orderByTitle ? 'title' : 'id';
    books.sort();
});

layoutView.on('onChange', (val) => {
    booksView.setFilter((child) => {
        return child.get('title').toUpperCase()
            .indexOf(val.toUpperCase()) != -1;
    });
    books.comparator = books.comparator || 'id';
    books.sort();
});

let booksView = new BooksView({
    collection: books
});

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

books.fetch().then(() => {
    app.showView(layoutView);
    layoutView.getRegion('list').show(booksView);
});

//When the book collection is fetched:
//app.showView(booksCollectionView);