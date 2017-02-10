import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import _ from 'underscore';

import LayoutTemplate from './layout.html';
import RegionTemplate from './region.html';

const LayoutView = Marionette.View.extend({
    template: _.template(LayoutTemplate),
    className: 'layout-view',
    regions: {
        r: '.region'
    }
});

const RegionView = Marionette.View.extend({
    template: _.template(RegionTemplate),
    className: 'region-view'
})

const app = new Marionette.Application({
    region: '#main'
})

app.start();

let layoutView = new LayoutView();
let regionView = new RegionView();

app.showView(layoutView);

layoutView.getRegion('r').show(regionView);
