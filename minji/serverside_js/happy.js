function Happy(food, drink) {
    if( food == "생활맥주순살치킨" && drink == "맥주") {
        return "이게 행복이다~!"
    } else if( food == "치킨" || drink == "맥주") {
        return "그래도 이정도면 머,,,^^"
    } else {
        return  `${drink} 보다 난 멜로가 체질 보면서 생활맥주 순!살! 치킨 먹으면서 맥!주! 마시고싶다~`
    }
}

console.log(Happy("흠냐", "콜라"))
console.log(Happy("생활맥주순살치킨", "맥주"))

var o = require('os');
console.log(o.platform());