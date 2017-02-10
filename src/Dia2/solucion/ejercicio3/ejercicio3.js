import _ from 'underscore';
import Marionette from 'backbone.marionette';

import Template from './ejercicio3.html';

const StaticView = Marionette.View.extend({

    template: _.template(Template),

    ui: {
        list: 'ul'
    },

    events: {
        'click .remove': 'removeItemPressed',
        'click .add': 'addItemPressed'
    },

    onRender() {
        for(let i = 1; i <= 10; i++) {
            this.addListItem(i);
        }
    },

    addListItem(id) {
        this.ui.list.append(`<li>Item ${id}</li>`);
    },

    removeItemPressed() {
        this.ui.list.children().last().remove();
    },

    addItemPressed() {
        this.addListItem(this.ui.list.children().length + 1);
    }
});

const app = new Marionette.Application({
    region: '#main'
});

app.start();

var staticview = new StaticView();

app.showView(staticview);