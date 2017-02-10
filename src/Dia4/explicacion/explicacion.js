import _ from 'underscore';
import Backbone from 'backbone';
import Marionette from 'backbone.marionette';

import Template from './explicacion.html';

const MyView = Marionette.View.extend({

    template: _.template(Template),

    className: 'my-view'
});

const app = new Marionette.Application({
    region: '#main'
});

app.start();

var myView = new MyView();

app.showView(myView);