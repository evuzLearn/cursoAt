import Backbone from 'backbone';
import _ from 'underscore';

// Book: id, title, language, edition, publisher

//TODO: 1.-
// Defina un modelo Book que por defecto su 'language' sea 'Java'.
// Además cada vez que se cree una instancia del modelo muestre por consola 'Creando libro...'

const Book = Backbone.Model.extend({
    defaults: {
        language: 'Java'
    },
    initialize: function () {
        console.log('Creando libro..');
    }
});

// TODO: 2.-
// Cree una instancia del modelo anterior con 'title' 'Head First Java'

let book = new Book({
    title: 'Head First Java'
});

// TODO: 3.-
// Cambie al libro el 'language' a 'Javascript'

book.set({
    language: 'JavaScript'
});

// TODO: 4.-
// Añada:  edition = 'third' y publisher = 'O'Reilly'

book.set({
    edition: 'third',
    publisher: 'O\'Reilly'
})

// TODO: 5.-
// Defina un nuevo modelo Book y recupere el libro de http://localhost:3030/books/1

let book1 = new Book();
book1.fetch({ url: 'http://localhost:3030/books/1' }).then(() => {
    console.log(book1.attributes);
})

// TODO: 6.-
// Crear un nuevo libro y guardar en sevidor
// title = 'Python Programming'
// language = 'Python'
// edition = 'third'
// publisher = 'Paperback'

let newBook = new Book({
    title: 'Python Programming',
    language: 'Python',
    edition: 'third',
    publisher: 'Paperback'
})

newBook.urlRoot = 'http://localhost:3030/books';
newBook.save().then(() => {
    console.log('SAVE')
});


//EVENTOS

var book4 = new Backbone.Model({
    title: 'Python Programming',
    language: 'Python',
    edition: 'third',
    publisher: 'Paperback'
}, {});


// TODO: 7.-
// Asociar un evento que muestre por consola 'Cambiando...' cuando se modifique book4

book4.on('change', () => {
    console.log('Cambiando..');
},this)

book4.set({
    language: 'Java'
});

// TODO: 8.-
// Asociar un evento que muestre por consola 'Cambiando Edition ...' cuando se modifique de book4 su 'edition'

book4.on({
    'change:edition': () => {console.log('Edition..')}
})

book4.set({
    edition: 'fourth'
});

// TODO: 9.-
// Desactive los eventos anteriores
book4.off();
// book4.off('change');
// book4.off('change:edition');


book4.set({
    edition: 'sixth'
});


