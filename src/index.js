// import './index.css';
const { log } = require('./common');

log('webpack');


//以下为for in 和for of 的一些区别

//for in 遍历的是index， for of遍历的是value
//使用for in会遍历数组所有的可枚举属性，包括原型。例如上栗的原型方法method和name属性
Array.prototype.method=function(){
    console.log(this.length);
}
var myArray=[1,2,4,5,6,7]
myArray.name="数组"

for (var index in myArray) {
    console.log(myArray[index]);
}

for (var value of myArray) {
    console.log(value);
}