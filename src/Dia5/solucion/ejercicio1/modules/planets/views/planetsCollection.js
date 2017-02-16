import PlanetsChildViewTemplate from './planetsChild.html';

const PlanetsChildView = Marionette.View.extend({

    tagName: 'li',

    className: 'planets-child-view',

    template: _.template(PlanetsChildViewTemplate),

    triggers: {
        click: 'planetPressed'
    }
});

const PlanetsCollectionView = Marionette.CollectionView.extend({

    tagName: 'ul',

    className: 'planets-collection-view',

    childView: PlanetsChildView,

    childViewEvents: {
        planetPressed: 'planetPressed'
    },

    planetPressed(view) {
        this.trigger('planetPressed', view.model);
    }
});

export default PlanetsCollectionView;