import BookDetailsView from './views/bookDetails';

function show(book) {
    if(!book)
        book = Broker.channel('CMS').request('getEmptyBook');
    showBookDetails(book);
}

function showBookDetails(book) {
    let bookDetailsView = new BookDetailsView({
        model: book
    });

    bookDetailsView.on({
        onBack() {
            Broker.channel('books').request('show');
        },
        onUpdate(formValues) {
            let attr = book.attributes;
            
            Object.keys(attr).forEach(attr => {
                if(attr != 'id')
                    book.set(attr, formValues[attr]);
            })

            Broker.channel('CMS').request('saveBook', book)
                .then(() => {
                    alert('Editado correctamente');
                    Broker.channel('books').request('show');
                })
                .fail((err) => {
                    console.error(err)
                    alert('El libro no se ha podido editar')
                });
        }
    })

    Broker.channel('main').request('showView', bookDetailsView);
}

/**
 * API
 */

const API = {
    show
}

Broker.channel('bookDetails').reply(API);

export default API;