import CharacterTemplate from './charactersChild.html'

const CharacterView = Marionette.View.extend({
    template: _.template(CharacterTemplate),
    className: 'characters-child-view',
    tagName: 'li',
    triggers: {
        'click': 'onClick'
    }
})

const CharacterCollectionView = Marionette.CollectionView.extend({
    className: 'characters-collection-view',
    tagName: 'ul',
    childViewEvents: {
        'onClick': 'handleClick'
    },
    childView: CharacterView,
    handleClick(model) {
        this.children.each(x => {
            x.$el.removeClass('selected');
        })
        model.$el.addClass('selected');
    }
})

export default CharacterCollectionView;