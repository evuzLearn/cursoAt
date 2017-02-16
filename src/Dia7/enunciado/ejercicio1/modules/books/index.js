import BooksView from './views/books';
import BooksCollectionView from './views/booksCollectionView';

let booksView = null;
let booksCollectionView = null;

let state = {};

function show() {
    // console.log('booksShow')
    Broker.channel('CMS').request('getBooksCollection')
        .then(books => {
            // console.log(state);
            showBooksView();
            showBooksCollectionView(books);
        })
        .fail((err) => {
            console.error(err)
        })
}

function showBooksView() {    
    booksView = new BooksView({state});

    booksView.on({
        onAdd() {
            Broker.channel('bookDetails').request('show');
        },
        onInputChange(value) {
            booksCollectionView.setFilter((child) => {
                return (
                    (child.get('title').toUpperCase()
                    .indexOf(value.toUpperCase()) != -1) || 
                    (child.get('language').toUpperCase()
                    .indexOf(value.toUpperCase()) != -1)
                );
            });

            booksCollection.comparator = booksCollection.comparator || 'id';
            booksCollection.sort(); 
        },
        onSort(value) {
            booksCollection.comparator = value;
            booksCollection.sort();
        }
    });

    Broker.channel('main').request('showView', booksView);
}

let booksCollection = null;

function showBooksCollectionView(books) {
    booksCollection = books;
    booksCollectionView = new BooksCollectionView({
        collection: booksCollection,
        state
    });

    booksCollectionView.on({
        onChildClick(booksCollection) {
            Broker.channel('bookDetails').request('show', booksCollection);
        },
        onChildRemove(booksCollection) {
            Broker.channel('CMS').request('deleteBook', booksCollection);
        },
        onAttach() {
            booksView.setScrollTop();
        }
    });

    booksView.showChildView('list', booksCollectionView);
}

/**
 * API
 */

const API = {
    show
}

Broker.channel('books').reply(API);

export default API;