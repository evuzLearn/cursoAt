import _ from 'underscore';
import Backbone from 'backbone';
import Marionette from 'backbone.marionette';

import BookViewTemplate from './bookView.html';

/*
 * TODO: 1.-
 * Modifique el ejercicio anterior para que "language" sea una select. Para ello recuperelos
 * de "http://localhost:3030/languages"
 * Recupere el libro con id 1 de http://localhost:3030/books
 *
 * TODO: 2.-
 * Al cambiar el valor de language, cambie el color del titulo en función del valor seleccionado
 *
 * TODO: 3.-
 * Añada un botón "Update" con su funcionalidad (contra servidor)
 */

const Book = Backbone.Model.extend({
    urlRoot: 'http://localhost:3030/books'
});

const Language = Backbone.Model.extend({

});

const Languages = Backbone.Collection.extend({
    model: Language,
    url: 'http://localhost:3030/languages'
});

const BookView = Marionette.View.extend({

    template: _.template(BookViewTemplate),

    className: 'book-view',

    ui: {
        headingTitle: 'h1',
        allFields: 'input, select',
        title: '.title',
        language: '.language',
        edition: '.edition',
        publisher: '.publisher',
        toggleEnableButton: '.toggle-enabled'
    },

    events: {
        'click .toggle-enabled': 'toggleEnabledPressed',
        'change @ui.language': 'updateTitleColor',
        'click .update': 'updateBook'
    },

    colorByLanguage: {
        Java: 'red',
        Javascript: 'blue',
        'C++': 'green'
    },

    languages: null,

    isEnabled: true,

    initialize(options) {
        this.languages = options.languages;
    },

    onRender() {
        this.fillLanguageSelect();
        this.ui.language.val(this.model.get('language'));
        this.updateTitleColor();
    },

    fillLanguageSelect() {
        this.languages.each(lang => {
            this.ui.language.append(
                `<option>${lang.get('language')}</option>`);
        });
    },

    updateTitleColor() {
        var languageColor = this.colorByLanguage[this.ui.language.val()];
        this.ui.headingTitle.css('color', languageColor);
    },

    updateBook() {

        this.model.set({
            title: this.ui.title.val(),
            language: this.ui.language.val(),
            edition: this.ui.edition.val(),
            publisher: this.ui.publisher.val()
        });

        this.trigger('updateButtonPressed');
    },

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

var languages = new Languages();

var book = new Book({id: 1});

languages.fetch()
    .then(() => {
        return book.fetch();
    })
    .then(() => {

        var bookView = new BookView({
            model: book,
            languages: languages
        });

        bookView.on('updateButtonPressed', () => {

            book.save()
                .then((data, response) => {
                    alert(response);
                })
                .fail(() => {
                    console.error('Error');
                });
        });

        app.showView(bookView);
    })
    .fail((error) => {
        console.error(error);
    });