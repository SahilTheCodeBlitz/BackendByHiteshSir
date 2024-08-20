// lets define function to add two numbers

function addNum(num1,num2){
    return num1+num2;
}

result = addNum(3.4,3)

console.log(result);

// crrating a arrow function

const sub = (num1,num2)=>{
    return num1-num2;
}

console.log(sub(4,5));

// javascript objects

// we can also javascript object using new keyword Object class use

let objec1 = new Object();//empty object created

// lets add the properties to object

objec1.firstName = 'sahil';
objec1.lastName = 'khane';
objec1.age = 56;

console.log(objec1);

// creatig a object and alos defininf method inside the object

const Car = {

    name:"Maruti suzuki",
    modelno:"M124",
    color:"black",
    price:67000,
    carstart: ()=>{
        console.log(`car name ${Car.name} is starting`);        
    },

    carStop: function(){
        console.log(`car name ${Car.name} is stopeed`);
    }


    
}

console.log(Car);

// accessing the properties and method

console.log(Car.name);
console.log(Car['modelno']);
console.log(Car.carstart()); 

console.log(Car.carStop());
// console.log(output);

// deleting the object property

delete Car.price;
console.log(Car);




// Constructor function methods

// fucmntio call parne par direct object ban jata hai


    function Person(first, last, age, eye) {
        this.firstName = first;
        this.lastName = last;
        this.age = age;
        this.eyeColor = eye;
      }

      const myFather = new Person("John", "Doe", 50, "blue");

      console.log(myFather);