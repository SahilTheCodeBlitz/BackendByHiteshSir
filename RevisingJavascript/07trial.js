// Javascript arrays



const cars = ['Maruti','BMW','Porshe']

const mixArr = ['Maruti',12,45,22.45]

console.log(cars);
console.log(mixArr);

console.log(cars[0]);
console.log(mixArr[1]);

const carsa = new Array('Sahil','Sujal','Wauot')
console.log(carsa);

// array length

console.log(carsa.length);

for(let i=0;i<carsa.length;i++){
    console.log(carsa[i]);
}

// for each loop to travese array elements

console.log('for each loop');

carsa.forEach((element,index)=>{
    console.log(`array[${index}] = ${element}`);
})

const  fruits = ['mango','apple']

fruits.push('guava')

console.log(fruits);

fruits.pop()

console.log(fruits);
