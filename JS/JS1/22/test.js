// window.onload = function addEvent(){
//     var elemList = document.getElementsByTagName("input");
//     for(var i = 0;i<elemList.length;i++){
//         elemList[i].addEventListener("click",function(){
//            var that = this;
//            traverseNodes(that);
//         });
//     }
// }

// function traverseNodes(that){
//     var method = that.value;
//     console.log(method);
// }

// var data = 0;
// var count = function(){
//     console.log("count:",data++);
//      return count;
// }
// setInterval(count(),1000);
// console.log('hh');

 var obj = new Object();

 function createObj(name,age){
     this.name = name;
     this.age = age;
     this.getName = fucntion(){
         return this.name;
     };
 }
 
 createObj.call(obj);
 obj.__proto__ = createObj.prototype;
 obj.name = 
