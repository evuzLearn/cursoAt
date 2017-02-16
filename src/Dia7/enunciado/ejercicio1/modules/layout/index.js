import LayoutView from './views/layout';

let layoutView;

function show() {
    showLayoutView();
}

function showChildView(region, view) {
    layoutView.showChildView(region, view);
    layoutView.showRegion(region);
}

function showRegion(region) {
    layoutView.showRegion(region);
}

function hideRegion(region) {
    layoutView.hideRegion(region);
}

function showLayoutView() {
    layoutView = new LayoutView();

    layoutView.on({
        onAdd() {
            Broker.channel('bookDetails').request('show');
            Broker.channel('books').request('selectCurrentBook');
        }
    })

    Broker.channel('main').request('showView', layoutView);
}

/**
 * API
 */

const API = {
    show,
    showChildView,
    showRegion,
    hideRegion
}

Broker.channel('layout').reply(API);
export default API;