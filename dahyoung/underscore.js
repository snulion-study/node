var _ = require('underscore');
var arr = [3,6,9,1,12];
console.log(arr[0]);
console.log(_.first(arr));
//마지막 원소 가지고 오고 싶을 때
console.log(arr[arr.length-1])
console.log(_.last(arr))