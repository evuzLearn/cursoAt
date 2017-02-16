import BookDetailsView from './views/bookDetails';

let bookDetailsView;

function show(book) {
    if(!book)
        book = Broker.channel('CMS').request('getEmptyBook');
    showBookDetails(book);
}

function showBookDetails(book) {
    bookDetailsView = new BookDetailsView({
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
                    // alert('Editado correctamente');
                    // Broker.channel('books').request('show');
                    // Broker.channel('books').request('selectCurrentBook', book.get('id'))
                    Broker.channel('layout').request('hideRegion','right');
                    Broker.channel('books').request('updateBooksView', book.get('id'));
                })
                .fail((err) => {
                    console.error(err)
                    alert('El libro no se ha podido editar')
                });
        }
    })

    Broker.channel('layout').request('showChildView', 'right', bookDetailsView);
}

function viewDestroy() {
    bookDetailsView.destroy();
}

/**
 * API
 */

const API = {
    show,
    viewDestroy
}

Broker.channel('bookDetails').reply(API);

export default API;