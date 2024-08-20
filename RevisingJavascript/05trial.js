// string search methods

let text = "Please locate where 'locate' occurs!";

console.log(text.indexOf('locate'));
console.log(text.indexOf('e'));

console.log(text.length);

console.log(text.lastIndexOf('s'));

console.log(text.lastIndexOf('locate',16)); // 16 se search start hogi

console.log(text.includes('locate'));