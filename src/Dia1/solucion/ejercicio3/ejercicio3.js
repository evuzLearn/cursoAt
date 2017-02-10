import Backbone from 'backbone';

// Book: id, title, language, edition, publisher

//TODO: 1.-
// Defina un modelo Book que por defecto su 'language' sea 'Java'.
// Además cada vez que se cree una instancia del modelo muestre por consola 'Creando libro...'

const BookModel = Backbone.Model.extend({

    defaults: {
        language: 'Java'
    },

    initialize(data, options) {
        console.log('1: Creando libro...');
    }
});


// TODO: 2.-
// Cree una instancia del modelo anterior con 'title' 'Head First Java'

var book1 = new BookModel({
    title: 'Head First Java'
});

console.log('2: ', book1.attributes);


// TODO: 3.-
// Cambie al libro el 'language' a 'Javascript'

book1.set('language', 'Javascript');
console.log('3: ', book1.attributes);


// TODO: 4.-
// Añada:  edition = 'third' y publisher = 'O'Reilly'

book1.set({
    edition: 'third',
    publisher: 'O\'Reilly'
});

console.log('4: ', book1.attributes);


// TODO: 5.-
// Defina un nuevo modelo Book y recupere el libro de http://localhost:3030/books/1

const BookModel2 = Backbone.Model.extend({
    urlRoot: 'http://localhost:3030/books'
});

var book2 = new BookModel2({id: 1});

book2.fetch()
    .then((data, response) => {
        console.log('5: ', book2.attributes);
    });

//book2.fetch({
//    success() {
//        console.log('5: ', book2.attributes);
//    }
//});

// TODO: 6.-
// Crear un nuevo libro y guardar en sevidor
// title = 'Python Programming'
// language = 'Python'
// edition = 'third'
// publisher = 'Paperback'

var book3 = new BookModel2({
    title: 'Python Programming',
    language: 'Python',
    edition: 'third',
    publisher: 'Paperback'
});

book3.on('request', model => {
    console.log('6: Event - REQUEST ', model.attributes);
});

book3.on('sync', model => {
    console.log('6: Event - SYNC ', model.attributes);
});

book3.save()
    .then((data, response) => {
        console.log('6: ', book3.attributes);
    })
    .fail((error) => {
        console.error(error);
    });


//EVENTOS

var book4 = new Backbone.Model({
    title: 'Python Programming',
    language: 'Python',
    edition: 'third',
    publisher: 'Paperback'
});


// TODO: 7.-
// Asociar un evento que muestre por consola 'Cambiando...' cuando se modifique book4

book4.on('change', model => {
    console.log('7: Event - Cambiando...', model.attributes);
});

book4.set('title', 'Test1');


// TODO: 8.-
// Asociar un evento que muestre por consola 'Cambiando Edition ...' cuando se modifique de book4 su 'edition'

book4.on('change:edition', model => {
    console.log('8: Event - Cambiando Edition ...', model.attributes);
});

book4.set('edition', 'Test1');

// TODO: 9.-
// Desactive los eventos anteriores

book4.off('change');
book4.off('change:edition');
book4.set('edition', 'third');