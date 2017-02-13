import Template from './planetDetails.html';

const PlanetDetailsView = Marionette.View.extend({
    template: _.template(Template),
    className: 'planet-details-view'
});

export default PlanetDetailsView;
