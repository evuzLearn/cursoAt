import Template from './commentsView.html';

const CommentView = Marionette.View.extend({
    template: _.template(Template),
    className: 'comment-child-view',
    initialize(options) {
        this.user = options.user;
    },
    user: null,
    tagName: 'li',
    triggers: {
        'click .remove-button': 'onRemove'
    },
    templateContext ()  {
        const user = this.user;
        return {
            isMine(author) {
                return author == user ? '' : 'hide';
            }
        }
    },
})

const CommentCollectionView = Marionette.CollectionView.extend({
    childView: CommentView,
    className: 'comments-collection-view',
    tagName: 'ul',
    childViewOptions() {
        return {
            user: this.options.user
        }
    },
    childViewEvents: {
        onRemove(ev) {
            this.trigger('onChildRemove', ev);
        }
    }
})

export default CommentCollectionView;