import Template from './login.html';

const LoginView = Marionette.View.extend({
    template: _.template(Template),
    className: 'login-view',
    ui: {
        inputUser: '#inputUser'
    },
    events: {
        'click #btn-login': 'handleLogin'
    },
    handleLogin() {
        this.trigger('onLogin', this.ui.inputUser.val());
    }
})

export default LoginView;