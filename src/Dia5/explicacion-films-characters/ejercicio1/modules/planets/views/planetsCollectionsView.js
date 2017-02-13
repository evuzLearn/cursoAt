const PlanetsView = Marionette.View.extend({
    template: _.template('<%= name %>'),
    className: 'planets-child-view',
    tagName: 'li',
    triggers: {
        'click': 'onClick'
    }
});

const PlanetsCollectionView = Marionette.CollectionView.extend({
    className: 'planets-collection-view',
    tagName: 'ul',
    childView: PlanetsView,
    childViewEvents: {
        'onClick': 'handleClickElement'
    },
    handleClickElement(model) {

    }
});

export default PlanetsCollectionView;