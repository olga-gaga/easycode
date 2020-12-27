//task 1
console.log('task 1');

(function(){
    function Planet(name) {
        this.name = name;
        this.getName = function () {
            return 'Planet name is ' + this.name;
        }
    }
    
    function PlanetWithSatellite(name, satellite){
        Planet.call(this, name);
        this.satellite = satellite;
    
        this.parentGetName = this.getName;
        
        this.getName = function(){
            return `${this.parentGetName.call(this)}. The satellite is ${this.satellite}.`;
        }
    }
    
    let earth = new PlanetWithSatellite('Earth', 'Moon');
    console.log(earth.getName());
})();

//task 2
console.log('task 2');
(function(){

    function Building(name, numberFloors) {

        this.name = name;
        this.numberFloors = numberFloors;

        this.getNumberFloors = function () {
            return this.numberFloors;
        }

        this.setNumberFloors = function (newNumberFloors) {
            this.numberFloors = newNumberFloors;
        }

    }

    function House (name, numberFloors, numberApartmentsPerFloor) {
        Building.call(this, name, numberFloors);

        this.numberApartmentsPerFloor = numberApartmentsPerFloor;
        this.parentGetNumberFloors = this.getNumberFloors;

        this.getNumberFloors = function () {
            const floors = this.parentGetNumberFloors.call(this);
            return {
                floors: floors,
                totalApartments: floors * this.numberApartmentsPerFloor,
            }
        }

    }

    function ShoppingCenter (name, numberFloors, numberShopsPerFloor) {
        Building.call(this, name, numberFloors);

        this.numberShopsPerFloor = numberShopsPerFloor;

        this.parentGetNumberFloors = this.getNumberFloors;

        this.getNumberFloors = function () {
            const floors = this.parentGetNumberFloors();

            return {
                floors: floors,
                totalStores: floors * this.numberShopsPerFloor,
            }
        }
    }

    const someHouse = new House('Some House', 12, 5);
    console.log(someHouse.getNumberFloors());

    const someShopingCenter = new ShoppingCenter ('Diamond City', 17, 10);
    console.log(someShopingCenter.getNumberFloors());
})();

//task 3
console.log('task 3');

(function () {

    function Furniture (name, price) {
        this.name = name;
        this.price = price; 
    }

    Furniture.prototype.getInfo = function () {
       return `Furniture. Name: ${this.name}, price: ${this.price}`;
    }

    const officeFurniture = new Furniture('Office table Techo+', 500);
    officeFurniture.cabinet = 'conference hall';

    officeFurniture.getInfo = function(){
        return `${Furniture.prototype.getInfo.call(this)}, cabinet: ${this.cabinet}`
    }

    console.log(officeFurniture.getInfo());

    const homeFurniture = new Furniture('Sofa Claudia', 300);
    homeFurniture.room = 'living room';

    homeFurniture.getInfo = function() {
        return `${Furniture.prototype.getInfo.call(this)}, room: ${this.room}`;
    }

    console.log(homeFurniture.getInfo());

})();


//task 4
console.log('task 4');

(function() {

    const week = 7*24*60*60*1000;
    
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday:'short',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric', 
    }

    function User (name, registrationDate) {
        this.name = name;
        this.registrationDate = new Date(registrationDate);
    }

    User.prototype.getInfo = function() {
        return `Name: ${this.name}\nRegistration date: ${this.registrationDate.toLocaleString('ru', options)}`;
    }

    function Admin(name, registrationDate, superAdmin) {
        User.call(this, name, registrationDate);
        this._superAdmin = superAdmin || false;

        this.getSuperAdmin = function () {
            return this._superAdmin;
        }
    }

    function Guest(name, registrationDate) {
        User.call(this, name, registrationDate);
        this.validDate = new Date(this.registrationDate.getTime() + week);
    }

    Admin.prototype = Object.create(User.prototype);
    Admin.constructor = Admin;

    Guest.prototype = Object.create(User.prototype);
    Guest.constructor = Guest;


    Admin.prototype.getInfo = function() {
        return `${User.prototype.getInfo.call(this)}\nSuperadmin: ${this.getSuperAdmin()}`;
    }

    Guest.prototype.getInfo = function() {
        return `${User.prototype.getInfo.call(this)}\nValidation date: ${this.validDate.toLocaleString('ru', options)}`;
    }

    const someAdmin = new Admin('Vova', '2020-10-30', true);

    console.log(someAdmin.getInfo());

    const someGuest = new Guest('Yuriy', '2020-12-10');
    console.log (someGuest.getInfo());

})();
