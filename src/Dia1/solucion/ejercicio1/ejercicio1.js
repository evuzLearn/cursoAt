function printExerciseNumber(num) {
    console.log(' ');
    console.log(`%c ${num}`, 'font-weight: bold');
}

//
// TODO 1
// Declarar en ES6 la clase Persona
//

printExerciseNumber(1);

/*
function Person(name, age) {
    this.name = name;
    this.age = age;
}

Person.prototype.greet = function() {
    console.log('Hi, my name is ' + this.name + ' and I\'m ' + this.age + ' years old.');
};

Person.prototype.haveABirthday = function() {
    this.age++;
};

var p = new Person('Posti', 31);

p.haveABirthday();
p.greet();
*/


class Person {

    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    greet() {
        console.log(`Hi, my name is ${this.name} and I\'m ${this.age} years old.`);
    }

    haveABirthday() {
        this.age++;
    }
}

var p = new Person('Posti', 31);

p.haveABirthday();
p.greet();


//
// TODO 2
// Crear un modulo que contenga una clase coche con dos atributos: make y km y
// dos métoodos: move(km) que incrementa los km según la cantidad y getKm(),
// que devuelve los km que tiene el coche
//

printExerciseNumber(2);

import Car from './car';

var car = new Car('VW', 50000);

car.move(100);
console.log('Car kms:', car.getKm());


//
// TODO 3
// Use funciones flecha en vez de las que se indican
//

printExerciseNumber(3);

var array = [1, 2, 3];

/*
array = array.map(function(x){
    return x * 2;
});
*/

array = array.map(x => x * 2);

console.log(array);

//
// TODO 4
// Declare las variables convenientemente
//

printExerciseNumber(4);

/*
var PI = 3.14;

function getCircleArea(r) {
    return PI * r * r;
}

for(var i = 1; i <= 3; i++) {
 console.log('r = ' + i  + ', area = ' + getCircleArea(i));
}
*/

const PI = 3.14;

const getCircleArea = r => PI * r * r;

for(let i = 1; i <= 3; i++) {
    console.log(`r = ${i}, area = ${getCircleArea(i)}`);
}

//
// TODO 5
// Simplifique este objeto usando sintaxis ES6
//

printExerciseNumber(5);

var prop2 = 'value2';

/*
var object1 = {

    prop1: 'value1',

    prop2: prop2,

    function1: function(param) {

        if(typeof param == 'undefined') {
            param = 1;
        }

        console.log(param);
    }
};
*/

var object1 = {

    prop1: 'value1',

    prop2,

    function1(param = 1) {
        console.log(param);
    }
};

console.log(object1.prop1);
console.log(object1.prop2);
object1.function1();

//
// TODO 6
// Simplifique estas asignaciones a variables usando sintaxis ES6
//

printExerciseNumber(6);

var object2 = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: 5,
    f: 6
};

/*
var a = object2.a;
var b = object2.b;
var c = object2.c;
var d = object2.d;
var e = object2.e;
var f = object2.f;
*/

var {a, b, c, d, e, f} = object2;

console.log(a, b, c, d, e, f);