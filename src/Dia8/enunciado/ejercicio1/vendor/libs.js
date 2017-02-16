import $ from 'jquery';
import _ from  'underscore';
import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import Broker from 'backbone.radio';
import Hybreed from './hybreed/hybreed';

window.$ = window.jQuery = global.jQuery = $;
window._ = _;
window.Backbone = Backbone;
window.Marionette = Marionette;
window.Broker = Broker;
window.Hybreed = Hybreed;

export {
    _,
    Backbone,
    Marionette,
    Broker,
    Hybreed
};
