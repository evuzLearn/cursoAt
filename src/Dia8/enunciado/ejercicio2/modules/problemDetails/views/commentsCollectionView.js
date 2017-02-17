import Template from './commentsView.html';

const CommentView = Marionette.View.extend({
    template: _.template(Template),
    className: 'comment-child-view',
    initialize(options) {
        this.user = options.user;
        this.problemAuthor = options.problemAuthor;
    },
    user: null,
    problemAuthor: null,
    tagName: 'li',
    triggers: {
        'click .remove-button': 'onRemove'
    },
    templateContext ()  {
        const {user, problemAuthor} = this;
        return {
            isMine(author) {
                return author == user ? '' : 'hide';
            },
            isOP (author) {
                return author == problemAuthor ? 'op' : '';
            }
        }
    },
})

const CommentCollectionView = Marionette.CollectionView.extend({
    childView: CommentView,
    className: 'comments-collection-view',
    tagName: 'ul',
    initialize(options) {
        this.problemId = options.problemId;
    },
    problemId: null,
    problemAuthor: null,
    filter (child) {
        return child.get('problemId') == this.problemId;
    },
    childViewOptions() {
        return {
            user: this.options.user,
            problemAuthor: this.options.problemAuthor
        }
    },
    childViewEvents: {
        onRemove(ev) {
            this.trigger('onChildRemove', ev);
        }
    }
})

export default CommentCollectionView;