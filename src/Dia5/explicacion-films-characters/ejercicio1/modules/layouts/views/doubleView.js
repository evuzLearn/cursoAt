import DoubleLayoutTemplate from './doubleView.html';

const DoubleLayoutView = Marionette.View.extend({
    template: _.template(DoubleLayoutTemplate),
    className: 'double-layout-view',
    initialize({primaryTitle = 'Title'}) {
        this.options.primaryTitle = primaryTitle;
    },
    triggers: {
        'click .header-primary .back-button': 'primaryBack',
        'click .header-secondary .back-button': 'secondaryBack'
    },
    ui: {
        left: '.left',
        right: '.right',
        secondaryTitle: '.header-secondary',
        secondaryTitleText: '.header-secondary .title'
    },
    templateContext() {
        return {
            getPrimaryTitle: this.getOption('primaryTitle'),
            getSecondaryTitle: this.getOption('secondaryTitle')
        }
    },
    regions: {
        left: '.left',
        right: '.right'
    },
    showContentRight() {
        this.ui.right.removeClass('portrait-hide');
    },
    hideContentRight() {
        this.ui.right.addClass('portrait-hide');
    },
    showTitleSecondary() {
        this.ui.secondaryTitle.removeClass('portrait-hide');
    },
    hideTitleSecondary() {
        this.ui.secondaryTitle.addClass('portrait-hide');
    },
    setSecondaryTitle(title) {
        this.ui.secondaryTitleText.html(title);
    }
});

export default DoubleLayoutView;