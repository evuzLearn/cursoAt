import _ from 'underscore';
import Backbone from 'backbone';
import Marionette from 'backbone.marionette';

import BookViewTemplate from './bookView.html';

/*
 * TODO: 1.-
 *   Recupere de servidor el libro con id 1 y muestre en pantalla un formulario con su datos:
 *   "title", "language", "third", "O'Reilly"
 *   Use db.json - books
 *
 * TODO: 2.-
 *  Añada un botón Enable/Disable que al pulsar habilite/deshabilite el formulario
 *
 * TODO: 3.-
 *  Añada una cabecera que muestre el titulo del libro cuyo color de letra sea
 *  en función del lenguaje:
 *  Java- Rojo, Javascript - Azul, C++ - Verde
 *
 **/

const Book = Backbone.Model.extend({
    urlRoot: 'http://localhost:3030/books'
});

const BookView = Marionette.View.extend({

    template: _.template(BookViewTemplate),

    className: 'book-view',

    ui: {
        allFields: 'input',
        toggleEnableButton: '.toggle-enabled'
    },

    events: {
        'click .toggle-enabled': 'toggleEnabledPressed'
    },

    templateContext: {
        colorByLanguage: {
            Java: 'red',
            Javascript: 'blue',
            'C++': 'green'
        }
    },

    isEnabled: true,

    toggleEnabledPressed() {
        this.isEnabled = !this.isEnabled;
        this.ui.allFields.prop('disabled', !this.isEnabled);
        this.ui.toggleEnableButton.html(this.isEnabled ? 'Disable' : 'Enable');
    }
});

///

const app = new Marionette.Application({
    region: '#main'
});

app.start();

var book = new Book({id: 1});

book.fetch()
    .then(() => {

        var bookView = new BookView({
            model: book
        });

        app.showView(bookView);
    })
    .fail((error) => {
        console.error(error);
    });