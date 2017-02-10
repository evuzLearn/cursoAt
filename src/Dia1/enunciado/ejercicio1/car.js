class Car {
    constructor(make, km) {
        this.make = make;
        this.km = km;
    }

    move(km) {
        this.km += km;
    }

    getKm() {
        return this.km;
    }
}

export default Car;