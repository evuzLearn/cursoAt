import _ from 'underscore';
import Backbone from 'backbone';
import Marionette from 'backbone.marionette';

import BookTemplate from './bookChildView.html';
import LayoutTemplate from './booksView.html';

/*
 * TODO: 1.-
 *   Haga el ejercicio2 pero usando una tabla (en vez de una lista),
 *   con las columnas Title, Language, Edition y Publisher.
 *   
 * TODO: 2.-
 *   Añada funcionalidad para los libros ascendentemente según la cabecera de la tabla donde se pulse
 */

const Book = Backbone.Model.extend({});

const Books = Backbone.Collection.extend({
    model: Book,
    url: 'http://localhost:3030/books'
});

const BookView = Marionette.View.extend({
    template: _.template(BookTemplate),
    className: 'book-child-view',
    tagName: 'tr',
    triggers: {
        'click': 'onClick',
        'click .remove': 'onRemove'
    }
});

const LayoutView = Marionette.View.extend({
    template: _.template(LayoutTemplate),
    className: 'books-view',
    regions: {
        list: {
            el: '.books-view',
            replaceElement: true
        }
    },
    ui: {
        filter: '#filter',
        order: '#order'
    },
    orderByTitle: false,
    triggers: {

    },
    events: {
        'input #filter': 'handleChange',
        'click #title': function () {
            this.trigger('onOrder', 'title')
        },
        'click #lang': function () {
            this.trigger('onOrder', 'language')
        },
        'click #pub': function () {
            this.trigger('onOrder', 'publisher')
        }
    },
    handleChange() {
        this.trigger('onChange', this.ui.filter.val());
    }
});

const BooksView = Marionette.CollectionView.extend({
    className: 'books-collection-view',
    tagName: 'tbody',
    childView: BookView
});

///
const app = new Marionette.Application({
    region: '#main'
});

app.start();

let books = new Books();

let layoutView = new LayoutView();

layoutView.on('onOrder', (type) => {
    // data identificar text toLowerCase y sustituir en comparator
    // console.log(type)
    books.comparator = type;
    books.sort();
});

layoutView.on('onChange', (val) => {
    booksView.setFilter((child) => {
        return (
            (child.get('title').toUpperCase().indexOf(val.toUpperCase()) > -1) ||
            (child.get('language').toUpperCase().indexOf(val.toUpperCase()) > -1) ||
            (child.get('publisher').toUpperCase().indexOf(val.toUpperCase()) > -1)
        );
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