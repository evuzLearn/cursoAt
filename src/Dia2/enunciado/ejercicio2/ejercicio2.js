import _ from 'underscore';
import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import $ from 'jquery';

import Template from './bookView.html';

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
const BookModel = Backbone.Model.extend({
    urlRoot: 'http://localhost:3030/books'
});

const LanguageModel = Backbone.Model.extend({
    urlRoot: 'http://localhost:3030/languages'
});

const BookView = Marionette.View.extend({
    template: _.template(Template),
    tagName: 'div',
    className: 'static-view',
    ui: {
        btnEnable: '.btn-enable',
        btnUpdate: '.btn-update',
        classInput: '.input input',
        classSelect: '.select select',
        title: '.title'
    },
    events: {
        'click @ui.btnEnable': 'onClickEnable',
        'click @ui.btnUpdate': 'onClickUpdate',
        'change @ui.classSelect': 'onChange',
        'changeOption': 'onChangeOption'
    },
    enable: true,
    onClickEnable() {
        const {
            ui: {
                classInput,
                classSelect,
                btnEnable
            },
            enable} = this;

        this.enable = !this.enable;
        if (this.enable) {
            btnEnable.html('Disable');
            classInput.prop('disabled', false);
            classSelect.prop('disabled', false);
        } else {
            btnEnable.html('Enable');
            classInput.prop('disabled', true);
            classSelect.prop('disabled', true);
        }
    },
    onChangeOption(language) {
        console.log(language);
        const {ui: {classSelect}, model} = this;
        classSelect.append(
                    `<option value=${language}>${language}</option>`)
    },
    onClickUpdate() {
        const {ui: {classSelect}, model} = this;
        model.set({
            language: classSelect.val()
        })
        model.save();
    },
    onRender() {
        const {ui: {classSelect}, model} = this;

        classSelect.val(model.get('language'));
        this.titleColor();
        // let languages = new LanguageModel();
        // languages.fetch().then((data) => {
        //     data.forEach(x => {
        //         const {language} = x;
        //         classSelect.append(
        //             `<option value=${language}>${language}</option>`)
        //     });
        //     classSelect.val(model.get('language'));
        //     this.titleColor();
        // });
    },
    titleColor() {
        const {ui: {classSelect, title}} = this;

        const lang = classSelect.val()
        switch (lang) {
            case 'Java':
                title.css('color', 'red');
                break;
            case 'Javascript':
                title.css('color', 'blue');
                break;
            case 'C++':
                title.css('color', 'green');
                break;
        }
    },
    onChange() {
        this.titleColor();
    }
})

///
const app = new Marionette.Application({
    region: '#main'
});

app.start();

let book = new BookModel({
    id: 1
})

let bookView = new BookView({
    model: book
});

// book.fetch().then(() => app.showView(bookView));

book.fetch().then(() => {
    let languages = new LanguageModel();
    languages.fetch().then((data) => {
        data.forEach(x => {
            const {language} = x;
            bookView.triggerMethod('changeOption', language);
            // classSelect.append(
            //     `<option value=${language}>${language}</option>`)
        });
        
        app.showView(bookView)
    });
});

//When the book is fetched:
//app.showView(bookView);