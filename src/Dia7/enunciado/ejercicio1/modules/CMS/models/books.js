const Book = Backbone.Model.extend({
    urlRoot: 'http://localhost:3030/books',

    defaults: {
        title: '',
        language: '',
        edition: '',
        publisher: ''
    }
})

const Books = Backbone.Collection.extend({
    url: 'http://localhost:3030/books',
    model: Book
})

let books = null;

function getBooksCollection() {
    let deferred = $.Deferred();

    let tempBooks = new Books();

    if (books) {
        deferred.resolve(books);
    } else {
        tempBooks.fetch()
            .then(() => {
                books = tempBooks;
                deferred.resolve(books)
            })
            .fail((err) => {
                deferred.reject(err);
            })
    }

    return deferred.promise();
}

function saveBook(book) {
    let deferred = $.Deferred();

    book.save()
        .then(() => {
            books.add(book);
            deferred.resolve(book);
        })
        .fail(err => {
            deferred.reject(err);
        })

    return deferred.promise();
}

function getEmptyBook() {
    let book = new Book();
    return book;
}

function deleteBook(book) {
    return book.destroy();
}

export default {
    getBooksCollection,
    saveBook,
    getEmptyBook,
    deleteBook
}