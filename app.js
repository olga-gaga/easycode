//task 1
const string = 'some test string';

let changedСase0 = string[0].toUpperCase() + string.slice(1, string.length - 1) + string[string.length - 1].toUpperCase();
let changedСase1 = `${string[0].toUpperCase()}${string.slice(1, string.length - 1)}${string[string.length - 1].toUpperCase()}`;

console.log('Task 1. Way 1: ', changedСase0, ', way 2: ', changedСase1);

//task 2
let positionStr = string.indexOf('string');

console.log('Task 2. ', positionStr);

//task 3
let secondSpace = string.indexOf(' ', string.indexOf(' ')+ 1);

console.log('Task 3. ', secondSpace);

//task 4
let subString = string.slice(5, 9);

console.log('Task 4. ', subString);

//task 5
let pi = +(Math.PI.toFixed(2));

console.log('Task 5. ', pi);

//task 6
let maxValue = Math.max(15, 11, 16, 12, 51, 12, 13, 51);
let minValue = Math.min(15, 11, 16, 12, 51, 12, 13, 51);

console.log('Task 6. Max: ', maxValue, ', min: ', minValue);
//task 7
let randomNum = +(Math.random().toFixed(2));

console.log('Task 7. ', randomNum);

//task 8

let randomTo1000 = Math.floor(Math.random() * 1000 + 1);

console.log('Task 8. From 0 to 1000: ', randomTo1000);

//task 9
let sum = 0.6 + 0.7;

let way1 = parseFloat((0.6 + 0.7).toFixed(1));
let way2 = (0.6 * 10 + 0.7 *10) / 10;

console.log('Task 9. Sum:', sum, ' Way 1:', way1, 'Way 2:', way2);

//task 10
let object = {
    product: 'iPhone'
};

//task 11
object.price = 1000;
object['currency'] = 'dollar';

//task 12
object.details = {};
object.details.model = '';
object['details']['color'] = '';

console.log('Task 10-12.', object);