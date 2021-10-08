const fs = require('fs');
//fs.writeFileSync('test.txt', [1,2,3,4])
const d = fs.readFileSync('test.txt').toJSON();
console.log(d);