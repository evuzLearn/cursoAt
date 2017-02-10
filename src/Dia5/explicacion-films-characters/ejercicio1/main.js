import './vendor/libs';
import './modules/modules';
import App from './common/app';
import {Hybreed, Broker} from './vendor/libs';

function init() {
    App.start();
    Hybreed.init();
    Broker.channel('main').request('start');
}

$(document).ready(() => {
    if(window.cordova) {
        document.addEventListener('deviceready', init, false);
    } else {
        init();
    }
});