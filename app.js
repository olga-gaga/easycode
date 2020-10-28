(function(){
    //task 1
    console.log('task 1'); 
    
    let car = { 
        name: 'Lexus', 
        age: 10, 
        lastService: '7 month',
        create: 2008, 
        needRepair: false 
    };

    if(parseFloat(car.lastService) > 5) {
        car.needRepair = true;
        console.log('Need Repair');
    }

    //task 2
    console.log('task 2'); 

    let product = {
        name: 'Яблоко',
        price: '10$'
    };
    
    let min = 10; // минимальная цена
    let max = 20; // максимальная цена
    let prodPrice =parseFloat(product.price);

    if( !isNaN(prodPrice) && prodPrice >= min && prodPrice <= max){
        console.log(product.name);
    } 
    else {
        console.log('Товар не найден');
    }

    //task 3
    console.log('task 3'); 

    const string = 'JavaScript is a pretty good language';
    let resultString = '';

    for(let item of string.split(' ')) {
        resultString += `${item[0].toUpperCase()}${item.slice(1)}`;
    }
    console.log(`${string} => ${resultString}`);

    //task 4
    console.log('task 4'); 

    function doubleArray(array){
        if(!Array.isArray(array)) return 'Что-то пошло не так.';
        return array.concat(array);
    }

    console.log([1, 2, 3], '=>', doubleArray([1, 2, 3]));

    //task 5 
    console.log('task 5'); 

    function deleteFirst(){
        let resultArray = [];
        for (let array of arguments){
            if(Array.isArray(array)){ 
                array.shift();
                resultArray.push(array);
            }
        }
        return resultArray;
    }

    console.log(deleteFirst([1, 2, 3], ['a', 'b', 'c']));
    console.log(deleteFirst([1, 2, 3]));

    //task 6
    console.log('task 6'); 

    const users = [
        {
            "_id": "5d1c3860aa841704d3245513",
            "isActive": false,
            "balance": 2764.35,
            "age": 33,
            "name": "Allie Blair",
            "gender": "female",
            "company": "PHOTOBIN",
            "email": "allieblair@photobin.com",
            "phone": "+1 (951) 566-2987",
            "registered": "2018-11-30T02:29:00 -02:00"
        },
        {
            "_id": "5d1c386095ffb689687f2db9",
            "isActive": false,
            "balance": 3276.25,
            "age": 22,
            "name": "Yesenia Leblanc",
            "gender": "female",
            "company": "SKINSERVE",
            "email": "yesenialeblanc@skinserve.com",
            "phone": "+1 (947) 446-2840",
            "registered": "2015-10-31T01:10:31 -02:00"
        },
        {
            "_id": "5d1c3860e73ff2a338722e81",
            "isActive": true,
            "balance": 1868.65,
            "age": 38,
            "name": "Mamie Kramer",
            "gender": "female",
            "company": "EARBANG",
            "email": "mamiekramer@earbang.com",
            "phone": "+1 (885) 564-3305",
            "registered": "2014-06-03T09:36:40 -03:00"
        },
        {
            "_id": "5d1c386000e4f2fc62be1b1e",
            "isActive": true,
            "balance": 1003.15,
            "age": 32,
            "name": "Crawford Bryant",
            "gender": "male",
            "company": "DIGIRANG",
            "email": "crawfordbryant@digirang.com",
            "phone": "+1 (889) 408-2141",
            "registered": "2015-01-15T05:20:21 -02:00"
        },
        {
            "_id": "5d1c386008ff236a315d638b",
            "isActive": false,
            "balance": 3045.41,
            "age": 36,
            "name": "Helene Holland",
            "gender": "female",
            "company": "HYDROCOM",
            "email": "heleneholland@hydrocom.com",
            "phone": "+1 (937) 554-2040",
            "registered": "2014-09-15T08:22:59 -03:00"
        },
        {
            "_id": "5d1c3860b4c27c4d5fdb6c1f",
            "isActive": true,
            "balance": 1693.51,
            "age": 23,
            "name": "Hernandez Osborn",
            "gender": "male",
            "company": "TERRASYS",
            "email": "hernandezosborn@terrasys.com",
            "phone": "+1 (965) 595-3942",
            "registered": "2016-08-06T12:19:01 -03:00"
        }
    ];

    function getUsers(usersArray, field, value) {
        if(!Array.isArray(usersArray) && typeof field === 'string') return 'Что-то пошло не так.';
        let resultArray = [];
        for(let user of usersArray) {
            if(user.hasOwnProperty(field) && user[field] === value) resultArray.push(user);
        }
        return resultArray;
    }

    console.log(getUsers(users, 'gender', 'male'));
    console.log(getUsers(users, 'isActive', true));
    console.log(getUsers(users, null, true));
    
    //task 7
    console.log('task 7'); 

    const obj = {};

    (function(x) {
        x.b = 1;
        x = null;
    })(obj);
    
    console.log('obj = ', obj);

    let obj1 = {};

    obj1 = (function(x) {
        x.b = 1;
        x = null;
        return x;
    })(obj);

    console.log('obj1 = ', obj1);

    //task 8
    console.log('task 8'); 

    const price = {
        price: 10,
        discount: '15%',
        getPrice() {
            return this.price;
        }, 
        getPriceWithDiscount(){
            return this.price * (1 - parseFloat(this.discount)  / 100);
        }
      };
      
      console.log('price:', price.getPrice()); // 10
      console.log('price with discount:', price.getPriceWithDiscount()); // 8.5

      //task 9 
      console.log('task 9'); 

      let sizes = { width: 5, height: 10 },
      getSquare = function () { return this.width * this.height };

      console.log(getSquare.call(sizes));
      
      //every
      console.log('Задание по функциям высшего порядка');
      
      function every(numArray, callback){
          if (!Array.isArray(numArray) || typeof callback !== 'function') return 'Что-то пошло не так';
          for(let i = 0; i < numArray.length; i++) {
              if (!callback(numArray[i], i, numArray)) return false;
            }
            return true;
        }
        
        function checkNumber(number, index, array) {
            if (array[index] === number && number > 5) return true;
            return false; 
        }

        console.log(every([5, 7, 8 , 9], checkNumber));
        console.log(every([10, 7, 8 , 9], checkNumber));
        console.log(every([10, 7, 3 , 9], checkNumber));
})();