import _ from 'underscore';
import Marionette from 'backbone.marionette';

import Template from './ejercicio3.html';

const StaticView = Marionette.View.extend({
    template: _.template(Template),
    tagName: 'div',
    className: 'static-view',
})

const app = new Marionette.Application({
    region: '#main'
});

app.start();

let staticView = new StaticView({});

//When the book is fetched:
app.showView(staticView);