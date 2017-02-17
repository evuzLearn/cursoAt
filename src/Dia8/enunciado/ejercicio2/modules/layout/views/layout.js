import Template from './layout.html';

const LayoutView = Marionette.View.extend({
    template: _.template(Template),
    className: 'layout-view',
    regions: {
        left: '.left',
        right: '.right'
    },
    triggers: {
        'click .btn-logout': 'onLogout'
    },
    ui: {
        left: '.left',
        right: '.right'
    },
    showRegion(region) {
        switch (region) {
            case 'right':
                this.ui.right.removeClass('portrait-hide');
                break;
            case 'left':
                this.ui.left.removeClass('portrait-hide');
                break;
        }
    },
    hideRegion(region) {
        switch (region) {
            case 'right':
                this.ui.right.addClass('portrait-hide');
                break;
            case 'left':
                this.ui.left.addClass('portrait-hide');
                break;
        }
    }
})

export default LayoutView;