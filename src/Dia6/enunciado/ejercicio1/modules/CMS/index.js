import Books from './models/books';

function getBooksCollection () {
    return Books.getBooksCollection();
}

function saveBook (book) {
    return Books.saveBook(book);
}

function getEmptyBook() {
    return Books.getEmptyBook();
}

function deleteBook (book) {
    return Books.deleteBook(book);
}

//
// API
//

var API = {
    getBooksCollection,
    saveBook,
    getEmptyBook,
    deleteBook
};

Broker.channel('CMS').reply(API);
export default API;