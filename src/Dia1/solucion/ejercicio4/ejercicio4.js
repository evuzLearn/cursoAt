import Backbone from 'backbone';

//TODO: 1.-
// Defina una collection Books:
// -Al instanciar cada coleccion mostrar 'Creando coleccion libros de longitud '
// -Por cada libro que se instancia de la colección mostrar 'Creando libro...'
// -id será title

const BookModel = Backbone.Model.extend({

    idAttribute: 'title',

    initialize(data, options) {
        console.log('1: Creando libro...');
    }
});

const BooksCollection = Backbone.Collection.extend({

    model: BookModel,

    initialize(data, options) {
        console.log('1: Creando coleccion libros de longitud ' + data.length);
    }
});


// TODO: 2.-
// Instanciar la collection anteriormente creada con arrayBooks

var arrayBooks = [
    {
        'title': 'Head First Java',
        'language': 'Java',
        'edition': 'third',
        'publisher': 'O\'Reilly'
    },
    {
        'title': 'Head First Design Pattern',
        'language': 'Java',
        'edition': 'second',
        'publisher': 'O\'Reilly'
    }
];

var books = new BooksCollection(arrayBooks);
console.log('2: ', books.models);


// TODO 3.-
// Añada un nuevo libro a la colección creada

var book = {
    'title': 'Effective Java',
    'language': 'Java',
    'edition': 'third',
    'publisher': 'Sun Microsystems'
};

books.add(book);
console.log('3: Añadido libro', books.models);


// TODO 4.-
// Elimina de la collection el libro añadido anteriormente

var bookModel = books.findWhere({
    'title': 'Effective Java',
    'language': 'Java',
    'edition': 'third',
    'publisher': 'Sun Microsystems'
});

books.remove(bookModel);
console.log('4: Eliminado libro', books.models);


// TODO 5.-
// Recupera de la collection el libro de title 'Head First Design Pattern'

var bookModel2 = books.get('Head First Design Pattern');
console.log('5: Obtenido libro', bookModel2.attributes);


// TODO 6.-
// Cree una nueva collection y recupere los libros de http://localhost:3030/books

const BookModel2 = Backbone.Model.extend({});

const BooksCollection2 = Backbone.Collection.extend({

    model: BookModel2,

    url: 'http://localhost:3030/books',

    initialize(data, options) {
        console.log('Creando coleccion libros de longitud ' + data.length);
    }
});


var books2 = new BooksCollection2();

books2.on('request', collection => {
    console.log('Event - REQUEST');
});

books2.on('sync', collection => {
    console.log('Event - SYNC');
});

books2.fetch()
    .then(() => {
        console.log('6: ', books2.models);
    })
    .fail(() => {
        console.error('Error');
    });


// EVENTOS

var books3 = new Backbone.Collection();

// TODO 7.-
// Asociar evento al añadir un modelo a la colección

books3.on('add', () => {
    console.log('Añadido modelo');
});

books3.add({
    title: 'Effective Java',
    language: 'Java',
    edition: 'third',
    publisher: 'Sun Microsystems'
});