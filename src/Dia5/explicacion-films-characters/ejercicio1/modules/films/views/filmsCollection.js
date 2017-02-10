import FilmsChildViewTemplate from './filmsChild.html';

const FilmsChildView = Marionette.View.extend({

    tagName: 'li',

    className: 'films-child-view',

    template: _.template(FilmsChildViewTemplate),

    triggers: {
        click: 'filmPressed'
    }
});

const FilmsCollectionView = Marionette.CollectionView.extend({

    tagName: 'ul',

    className: 'films-collection-view',

    childView: FilmsChildView,

    childViewEvents: {
        filmPressed: 'filmPressed'
    },

    filmPressed(view) {
        this.trigger('filmPressed', view.model);
    }
});

export default FilmsCollectionView;