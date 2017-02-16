import CharactersChildViewTemplate from './charactersChild.html';

const CharactersChildView = Marionette.View.extend({

    tagName: 'li',

    className: 'characters-child-view',

    template: _.template(CharactersChildViewTemplate),

    triggers: {
        click: 'characterPressed'
    }
});

const CharactersCollectionView = Marionette.CollectionView.extend({

    tagName: 'ul',

    className: 'characters-collection-view',

    childView: CharactersChildView,

    childViewEvents: {
        characterPressed: 'characterPressed'
    },

    characterPressed(view) {
        this.trigger('characterPressed', view.model);
    }
});

export default CharactersCollectionView;