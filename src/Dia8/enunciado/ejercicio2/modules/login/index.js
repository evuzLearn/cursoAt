import LoginView from './views/login';

let loginView;

function show() {
    showLoginView();
}

function showLoginView() {
    loginView = new LoginView();

    loginView.on('onLogin', (inputValue) => {
        Broker.channel('CMS').request('login', inputValue);
        Broker.channel('problems').request('show');
    })

    Broker.channel('main').request('showView', loginView);
}

/**
 * API
 */

const API = {
    show
}

Broker.channel('login').reply(API);
export default API;