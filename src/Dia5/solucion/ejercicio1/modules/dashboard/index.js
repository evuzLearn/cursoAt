import DashboardView from './views/dashboard';

var dashboardView;

function show() {

    showDashboardView();
}

function showDashboardView() {

    dashboardView = new DashboardView();

    dashboardView.on('optionPressed', module => {
        Broker.channel(module).request('show');
    });

    Broker.channel('main').request('showView', dashboardView);
}

//
// API
//

var API = {
    show
};

Broker.channel('dashboard').reply(API);
export default API;
