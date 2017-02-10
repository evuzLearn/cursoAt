import _ from 'underscore';
import Backbone from 'backbone';
import Marionette from 'backbone.marionette';

import Template from './bookView.html';

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

const BookModel = Backbone.Model.extend({
    urlRoot: 'http://localhost:3030/books'
});

const BookView = Marionette.View.extend({
    template: _.template(Template),
    tagName: 'div',
    className: 'book-view',
    ui: {
        btn: '.btn',
        classInput: '.input input',
        title: '.title'
    },
    events: {
        'click @ui.btn': 'onClick',
    },
    enable: true,
    onClick() {
        this.enable = !this.enable;
        this.ui.classInput.prop('disabled', !this.enable);
        this.ui.btn.html(isEnable ? 'Disable' : 'Enable');
    },
    onAttach() {
        const lang = this.model.get('language');
        switch (lang) {
            case 'Java':
                this.ui.title.css('color', 'red');
                break;
            case 'JavaScript':
                this.ui.title.css('color', 'blue');
                break;
            case 'C++':
                this.ui.title.css('color', 'green');
                break;
        }
    }
})
///
const app = new Marionette.Application({
    region: '#main'
});

app.start();

let book = new BookModel({
    id: 2
})

let bookView = new BookView({
    model: book
});

book.fetch().then(() => app.showView(bookView));

//When the book is fetched:
//app.showView(bookView);