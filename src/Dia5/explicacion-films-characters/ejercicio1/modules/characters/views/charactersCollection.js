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
    childView: CharacterView
})

export default CharacterCollectionView;