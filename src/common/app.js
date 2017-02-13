var app = new Marionette.Application({
    region: '#main'
});

app.on('initialize:after', function () {
    console.log(Backbone.history);
    if (!Backbone.history.started) {
        console.log('Bb history');
        return Backbone.history.start();
    }
});

window.App = app;

export default app;
