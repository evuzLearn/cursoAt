import _ from 'underscore';
import Backbone from 'backbone';
import Marionette from 'backbone.marionette';

import BookViewTemplate from './bookView.html';

/*
 * TODO: 1.-
 * Un alumno de uno de los cursos sugirió dar solución al ejercicio 2 del día 2
 * usando una CollectionView para renderizar las opciones del desplegable de
 * lenguaje (en vez de generar los elementos manualmente).
 *
 * Es algo complejo, pero aún así se propone como ejercicio, y también se
 * incluye su solución.
 *
 * Para dar solución a este problema, se recomienda que la lógica de
 * renderización de la CollectionView esté incluida entro de la BookView,
 * porque está fuertemente acoplada a esta (se requieren muchas intervenciones).
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
        edition: '.edition',
        publisher: '.publisher',
        toggleEnableButton: '.toggle-enabled'
    },

    regions: {
        language: {
            selector: '.language',
            replaceElement: true
        }
    },

    events: {
        'click .toggle-enabled': 'toggleEnabledPressed',
        'click .update': 'updateBook'
    },

    colorByLanguage: {
        Java: 'red',
        Javascript: 'blue',
        'C++': 'green'
    },

    isEnabled: true,

    languagesView: null,
    selectedLanguage: null,

    initialize(options) {
        this.languages = options.languages;
        this.selectedLanguage = this.model.get('language');
    },

    onRender() {
        this.renderLanguagesView();
        this.updateTitleColor();
    },

    renderLanguagesView() {

        this.languagesView = new LanguagesView({
            collection: this.languages
        });

        this.languagesView.on('changed', language => {
            this.selectedLanguage = language;
            this.render();
        });

        this.showChildView('language', this.languagesView);

        this.languagesView.setSelectedLanguage(this.selectedLanguage);
    },

    updateTitleColor() {
        var languageColor = this.colorByLanguage[this.languagesView.getSelectedLanguage()];
        this.ui.headingTitle.css('color', languageColor);
    },

    updateBook() {

        this.model.set({
            title: this.ui.title.val(),
            language: this.languagesView.getSelectedLanguage(),
            edition: this.ui.edition.val(),
            publisher: this.ui.publisher.val()
        });

        this.trigger('updateButtonPressed');
    },

    toggleEnabledPressed() {
        this.isEnabled = !this.isEnabled;
        this.ui.allFields.prop('disabled', !this.isEnabled);
        this.languagesView.setEnable(this.isEnabled);
        this.ui.toggleEnableButton.html(this.isEnabled ? 'Disable' : 'Enable');
    }
});

const LanguageView = Marionette.View.extend({

    template: _.template('<%= language %>'),

    tagName: 'option'
});

const LanguagesView = Marionette.CollectionView.extend({

    childView: LanguageView,

    tagName: 'select',

    className: 'language',

    events: {
        change: 'changed'
    },

    changed() {
        this.trigger('changed', this.$el.val());
    },

    getSelectedLanguage() {
        return this.$el.val();
    },

    setSelectedLanguage(currentLanguage) {
        this.$el.val(currentLanguage);
    },

    setEnable(enabled) {
        this.$el.prop('disabled', !enabled);
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