import BooksView from './views/books';
import BooksCollectionView from './views/booksCollectionView';

let booksView = null;
let booksCollectionView = null;

function show() {
    Broker.channel('CMS').request('getBooksCollection')
        .then(books => {
            showLayoutView();
            showBooksView();
            showBooksCollectionView(books);
        })
        .fail((err) => {
            console.error(err)
        })
}

function showLayoutView() {
    Broker.channel('layout').request('show');
}

function showBooksView() {    
    booksView = new BooksView();

    booksView.on({
        onAdd() {
            Broker.channel('bookDetails').request('show');
            selectCurrentBook();
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

    Broker.channel('layout').request('showChildView', 'left', booksView);
}

let booksCollection = null;
let bookSelect = null;

function showBooksCollectionView(books) {
    booksCollection = books;
    booksCollectionView = new BooksCollectionView({
        collection: booksCollection
    });

    booksCollectionView.on({
        onChildClick(book) {
            bookSelect = book;
            Broker.channel('bookDetails').request('show', bookSelect);
        },
        onChildRemove(book) {
            if(bookSelect == book) {
                Broker.channel('bookDetails').request('viewDestroy');
            }
            Broker.channel('CMS').request('deleteBook', book);
            Broker.channel('layout').request('hideRegion', 'right');
        }
    });

    booksView.showChildView('list', booksCollectionView);
}

function updateBooksView (id) {
    if(id) {
        booksCollectionView.setSelect(id);
    }
    booksCollectionView.render();
}

function selectCurrentBook(view) {
    booksCollectionView.selectCurrentBook(view);
}

/**
 * API
 */

const API = {
    show,
    selectCurrentBook,
    updateBooksView
}

Broker.channel('books').reply(API);

export default API;