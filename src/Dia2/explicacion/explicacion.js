import Backbone from 'backbone';
import Marionette, { View } from 'backbone.marionette';
import _ from 'underscore';

import Template from './explicacion.html'

const BookView = Marionette.View.extend({
    template: _.template(Template),
    tagName: 'p',
    className: 'static-view',
    ui: {
        divHello: '.hello',
        divBye: '.bye'
    },
    events: {
        'click @ui.divHello': 'helloPressed',
        'click @ui.divBye': 'byePressed'
    },
    triggers: {
        'click .hello-again': 'helloAgainPressed'
    },
    templateContext:{
        toUpperCase(text) {
            return text.toUpperCase()
        }
    },
    initialize(options) {
        console.log(options);
    },
    onRender() {
        console.log('render');
        // this.ui.divBye es un elemento jQuery
        this.ui.divBye.html('Bye');
    },
    onAttach() {
        console.log('attach');
        this.ui.divBye.html(
            this.ui.divBye.height()
        );
    },
    i: 0,
    helloPressed() {
        this.i++;
        this.ui.divHello.html(this.i)
    },
    byePressed(){
        this.trigger('byePressed');
    }
})

const Book = Backbone.Model.extend({

});

const app = new Marionette.Application({
    region: '#main'
});

app.start();

let book = new Book({
    title: 'El código Da Vinci',
    author: 'Dan Brown'
})

let bookView = new BookView({
    model: book
});

bookView.on('byePressed', () => {
    console.log('bye');
});

bookView.on('helloAgainPressed', () => {
    console.log('helloAgain');
});

app.showView(bookView);