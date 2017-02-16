import FilmsViewTemplate from './films.html';

const FilmView = Marionette.View.extend({

    template: _.template(FilmsViewTemplate),

    className: 'films-view',

    regions: {
        list: '.list'
    },

    triggers: {
        'click .back-button': 'backPressed'
    }
});

export default FilmView;