var fs = require('fs');

// Sync 방식
console.log(1);
var data = fs.readFileSync('data.txt', {encoding: 'utf8'});
console.log(data);


// Async 방식
console.log(2);
fs.readFile('data.txt', {encoding:'utf8'}, function(err, data){
    console.log(3);
    console.log(data);
})
console.log(4);

//호출하면 실행된 순서가 2 -> 4 -> 3임. 2번 실행 후에 readFile 읽는 작업은 background에서. 
