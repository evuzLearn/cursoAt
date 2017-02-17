import Template from './problemDetails.html';

const ProblemDetailsView = Marionette.View.extend({
    template: _.template(Template),
    className: 'problem-details-view',
    regions: {
        comments: '.comments'
    },
    ui: {
        solve: '.solve',
        'inputNewComment': '#new-comment'
    },
    triggers: {
        'click .back-button': 'onBack',
        'click .solve': 'onSolve',
        'click .btn-logout': 'onLogout'
    },
    events: {
        'click .publish': 'handleNewComment',
        'keyup #new-comment': 'handleKeyPress',
    },
    templateContext: {
        formatDate: (date) => {
            date = new Date(date);
            return date.toLocaleDateString();
        },
        isSolved(solved) {
            return solved ? '' : 'hide';
        }
    },
    setSolve(value) {
        this.ui.solve.css('color', value ? 'green' : 'gray')
    },
    handleNewComment() {
        this.trigger('onNewComment', this.ui.inputNewComment.val());
        this.ui.inputNewComment.val('');
    },
    handleKeyPress(e) {
        if (e.keyCode == 13) {
            this.handleNewComment();
        }
    }
})

export default ProblemDetailsView;