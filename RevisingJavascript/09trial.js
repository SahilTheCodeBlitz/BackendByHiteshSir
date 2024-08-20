const fruits = ["Apple", "Orange", "Apple", "Mango"];
let position = fruits.indexOf("Apple") + 1;

console.log(position);

console.log(fruits.includes('Mango'));

const num = [45,22,5,22,]

console.log(num.sort()); // sort function converts num in string and 
// then sort alphabitically

num.sort(function(a,b){
    return a-b;
})

console.log(num);

console.log(num.reverse());