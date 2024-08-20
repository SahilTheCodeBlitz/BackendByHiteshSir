//string methods

let text = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let length = text.length;

console.log(length);

// ,ethod for extracting character
console.log(text.charAt(2))
console.log(text[2]);

// at method similar to charat but it allows negative indexing

console.log(text.at(-1));

// methods for extracting substring

console.log(text.slice(0,4));
console.log(text.slice(-5,-1));

let texts = "Please visit Microsoft!";
let newText = texts.replace("Microsoft", "W3Schools");
console.log(newText);

// converting a string into the array

let t = 'sahil'
console.log(t.split(''));