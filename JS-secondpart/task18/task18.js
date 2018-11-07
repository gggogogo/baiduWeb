function LeftAdd(queue){
    var input = document.getElementById("input");
    var num = input.value;
    if(checkInput(num)){
        var span = document.createElement("span");
       span.innerHTML =num;
        var spanList = queue.childNodes;
        queue.insertBefore(span,spanList[0]);
    }
}
function RightAdd(queue){
    var input = document.getElementById("input");
    var num = input.value;
    if(checkInput(num)){
        var span = document.createElement("span");
        span.innerHTML = num;
        queue.appendChild(span);
     }
}

function LeftOut(queue){
    var childs = queue.childNodes;
    alert(childs[0].innerHTML);
    queue.removeChild(childs[0]);
}

function RightOut(queue){
    var childs = queue.childNodes;
    alert(childs[childs.length-1].innerHTML);
    queue.removeChild(childs[childs.length-1]);
}

function checkInput(num) {
    reg=/^[-+]?\d*$/; //整数的正则表达式
    if(num == "") {
        alert("输入不能为空！");
        return false;
    }else if(!reg.test(num)) {
        alert("只能输入整数！");
            return false;
    }else return true;
}

function init(){
    var queue = document.getElementById("queue");
    // document.getElementById("btn1").onclick = LeftAdd(queue);  这几行代码是错误的书写格式，因为有参数的情况要使用匿名函数来传参
    // document.getElementById("btn2").onclick = RightAdd(queue);
    //document.getElementById("btn3").onclick = LeftOut(queue);
    //document.getElementById("btn4").onclick = RightOut(queue);

    document.getElementById("btn1").onclick = function(){LeftAdd(queue);};
    document.getElementById("btn2").onclick = function(){RightAdd(queue);};
    document.getElementById("btn3").onclick = function(){LeftOut(queue);};
    document.getElementById("btn4").onclick = function(){RightOut(queue);};

        queue.onclick = function(e){
        e = e||window.event;    
        var t = e.target || e.srcElement;  //t:目标对象
        var tagName = t.tagName;　//tagName标签名称
        if( tagName == 'SPAN' ) {
        queue.removeChild(t);　   //厚书386页有讲解
        }
    };
}
//window.onload = function(){init();};
window.onload = init;
