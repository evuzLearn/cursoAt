import PlanetsViewTemplate from './planets.html';

const PlanetView = Marionette.View.extend({

    template: _.template(PlanetsViewTemplate),

    className: 'planets-view',

    regions: {
        content: '.content'
    },

    triggers: {
        'click .back-button': 'backPressed'
    }
});

export default PlanetView;