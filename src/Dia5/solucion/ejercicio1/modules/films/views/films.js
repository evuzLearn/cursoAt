import FilmsViewTemplate from './films.html';

const FilmView = Marionette.View.extend({

    template: _.template(FilmsViewTemplate),

    className: 'films-view',

    regions: {
        content: '.content'
    },

    triggers: {
        'click .back-button': 'backPressed'
    }
});

export default FilmView;