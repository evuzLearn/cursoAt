import Template from './filmDetails.html';

export default Marionette.View.extend({

    template: _.template(Template),

    className: 'film-details',

    triggers: {
        'click .back-button': 'backPressed'
    },

    templateContext: {

        romanize: {
            1: 'I',
            2: 'II',
            3: 'III',
            4: 'IV',
            5: 'V',
            6: 'VI',
            7: 'VII'
        },

        formatCrawl(crawl) {
            return crawl.replace(/\r\n\r\n/g, '<br/><br/>');
        }
    }
});