function hello(name){
    console.log('Hi, ' + name);
}
hello('egoing');

//터미널에서 uglifyjs pretty.js를 입력하면 indentation 다 사라져 가독성 떨어짐.
// uglifyjs pretty.js -m 를 하면 function hello(o){console.log("Hi, "+o)}hello("egoing"); 가 됨.
//uglifyjs pretty.js -o uglified.js -m  를 하게 되면 pretty.js가 uglify된 파일이 uglified.js라는 이름으로 저장됨
//uglifyjs pretty.js -o pretty.min.js -m 처럼 ~.min.js로 저장하기도 함.