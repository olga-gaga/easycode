//task 1
console.log('task 1');

(function (){

    const map = ["_id", "name", "isActive", "balance"];

    const users = [
    {
        "_id": "5d220b10e8265cc978e2586b",
        "isActive": true,
        "balance": 2853.33,
        "age": 20,
        "name": "Buckner Osborne",
        "gender": "male",
        "company": "EMPIRICA",
        "email": "bucknerosborne@empirica.com",
        "phone": "+1 (850) 411-2997",
        "registered": "2018-08-13T04:28:45 -03:00"
    },
    {
        "_id": "5d220b10144ef972f6c2b332",
        "isActive": true,
        "balance": 1464.63,
        "age": 38,
        "name": "Rosalie Smith",
        "gender": "female",
        "company": "KATAKANA",
        "email": "rosaliesmith@katakana.com",
        "phone": "+1 (943) 463-2496",
        "registered": "2016-12-09T05:15:34 -02:00"
    },
    {
        "_id": "5d220b1083a0494655cdecf6",
        "isActive": false,
        "balance": 2823.39,
        "age": 40,
        "name": "Estrada Davenport",
        "gender": "male",
        "company": "EBIDCO",
        "email": "estradadavenport@ebidco.com",
        "phone": "+1 (890) 461-2088",
        "registered": "2016-03-04T03:36:38 -02:00"
    }
    ];

    const mapUsers = users.map(user => 
        map.reduce((acc, key) => {
            if (Object.keys(user).indexOf(key) !== -1) {
                acc[key] = user[key];
            }
            return acc;
        }, {}));

    console.log(mapUsers);

})();
//task 2
console.log('task 2');

(function() {

    const charWithIndex = [{char:"a",index:12}, {char:"w",index:8}, {char:"Y",index:10}, {char:"p",index:3}, {char:"p",index:2}, {char:"N",index:6}, {char:" ",index:5}, {char:"y",index:4}, {char:"r",index:13}, {char:"H",index:0}, {char:"e",index:11}, {char:"a",index:1}, {char:" ",index:9}, {char:"!",index:14}, {char:"e",index:7}];

    function createStr(arrayOfChars){
        if(Array.isArray(arrayOfChars)){
            return [...arrayOfChars]
                .sort((prevIndex, nextIndex) => prevIndex.index - nextIndex.index)
                .reduce((acc, char) => (acc += char.char), '');
        }
        else console.log('Ошибочное значение');
    }

    const resultStr = createStr(charWithIndex);

    console.log(resultStr);

})();

//task 3
console.log('task 3');

(function() {
    
    function getInfo ({name = 'Unknown', info: {partners: [partner1, partner2] = []} = {}} = {}){
        console.log(`Name: ${name} \nPartners: ${partner1}, ${partner2}`);
    }

    const organisation = { 
        name: 'Google', 
        info: { 
          employees: ['Vlad', 'Olga'], 
          partners: ['Microsoft', 'Facebook', 'Xing'] 
      } };

    getInfo(organisation);

})();

//task 4
console.log('task 4');

(function() {  

    const person = {
        name: 'Denis',
        age: 30,
        lastGet: '',
        lastUpdate: '', 
        get nameField(){
            this.lastGet = Date(Date.now());
            console.log(this.name);
        }, 
        set nameField (newName) {
            this.lastUpdate = Date(Date.now());
            if(typeof newName === 'string') this.name = newName;
            else console.log('Ошибочное значение');
        }
    };
    console.log(person);
    person.nameField;
    console.log(person);
    person.nameField = 'Olga';
    console.log(person);
})();

//task 5
console.log('task 5');

(function() {
    
    const product = {
        brand: 'Apple',
        model: 'iPhone 7',
        price: '$300', 
        get info() {
            return `${this.brand} ${this.model}`;
        },
        set info(value) {
            if(typeof value === 'string') {
                [this.brand, ...model] = value.split(' ');
                this.model = model.join(' ');
            }
            else console.log('Ошибочное значение');
        },
    };
    console.log(product);
    console.log(product.info);
    product.info = 'Samsung S8 Gold';
    console.log(product);
    console.log(product.info);

})();

