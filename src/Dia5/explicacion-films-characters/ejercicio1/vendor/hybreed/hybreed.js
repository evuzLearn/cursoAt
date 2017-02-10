import Spinner from 'spin';

/* * * * * * * * * * * * *
 *                       *
 *  UNDER CONSTRUCTION   *
 *                       *
 * * * * * * * * * * * * */

var Hybreed = {

    init() {
        this.UI.init();
    }
};

Hybreed.UI = {

    init() {
        this.createSpinner('#main');
    },

    getDOMElement(elem) {
        if(elem instanceof jQuery) {
            return elem[0];
        } else if(typeof elem == 'string') {
            return $(elem)[0];
        }
    },

    createSpinner(elem) {

        var opts = {
            lines: 12,
            length: 10,
            width: 4,
            radius: 12,
            corners: 1,
            rotate: 0,
            trail: 60,
            speed: 1.0,
            direction: 1,
            shadow: true,
            hwaccel: true,
            color: '#fff'
        };

        this.spinnerTarget = this.getDOMElement(elem);
        new Spinner(opts).spin(this.spinnerTarget);
        this.spinner = new Spinner(opts).spin(this.spinnerTarget);
        this.hideSpinner();
    },

    showSpinner() {
        this.spinner.spin(this.spinnerTarget);
    },

    hideSpinner() {
        this.spinner.stop();
    }
};

export default Hybreed;