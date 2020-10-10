const fs = require('fs');

// Sync 
console.log(1);
const data = fs.readFileSync('note.md', {encoding: 'utf8'});
console.log(data);

// Async
console.log(2);
fs.readFile('note.md', {encoding: 'utf8'}, function(err, data) {
  console.log(3);
  console.log(data);
})
console.log(4);