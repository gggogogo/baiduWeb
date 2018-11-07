var data = [];
var txt = document.getElementById("txt");
var button = document.getElementsByTagName("button");
var canvas = document.getElementById("canvas");

addEventHandler(button[0], "click", function () {
    var val = txt.value;
    data.unshift(val);
    display();
})
addEventHandler(button[1], "click", function () {
    var val = txt.value;
    data.push(val);
    display(); 
})
addEventHandler(button[2], "click", function () {
    data.shift();
    display();
   
})
addEventHandler(button[3], "click", function () {
    data.pop();
    display();
  
})


function addDivDelEvent() {
    for (var cur = 0; cur < canvas.childNodes.length; cur++) {
        addEventHandler(canvas.childNodes[cur], "click", function (i) {
            return function () {
                
                 data.splice(i, 1);
                 display();

            };
        }(cur));
    }
}

// function divDelEvent(){

//     for (var i=0;i<canvas.childNodes.length;i++){
//         addEventHandler(canvas.childNodes[i],"click",function(){

//             data.splice(i,1);
//             display();

//         })
//     }
// }
// window.onload=divDelEvent;
// divDelEvent();

function display() {

    var str = "";
    for (var i = 0; i < data.length; i++) {
        str += `<div class="num">${data[i]} </div>`;
    }
    canvas.innerHTML = str;
    addDivDelEvent();
}
