var app = new Marionette.Application({
    region: '#main'
});

app.on('initialize:after', function () {
    if (!Backbone.history.started) {
        return Backbone.history.start();
    }
});

window.App = app;

export default app;
