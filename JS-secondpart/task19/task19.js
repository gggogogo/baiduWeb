


function LeftAdd(queue){
    var input = document.getElementById("input");
    //var div_wrapper = document.getElementById("queue");
    var num = input.value;
    if(checkInput(num)){
       var div_child = document.createElement("div");
       //一开始是因为多了这句话，所以队列元素长度限制为60 的语句，即使alert超出上限，还是会添加红色子div                                             
        queue.appendChild(div_child);
        // queue.style.position="relative";
        // div_child.style.position ="relative";
        // div_child.style.bottom="0px";             
       div_child.style.display = "inlineBlock";    //我自己测试的不加这句话，貌似也是没有问题的，思考问题出现在哪里
       div_child.style.height = num+"px";           //这里的px单位是不可以省略的  
       div_child.title=num+"";                     //title属性主要的设置当鼠标放在div上面的时候显示div的高度
       div_child.style.width = "15px"
       div_child.style.marginLeft = "3px";
       div_child.style.marginTop = (200-num)+"px";
       div_child.style.cssFloat = "left";
       div_child.style.backgroundColor = "red";
       var divList = queue.childNodes;
    }
       if(divList.length < 60){
        queue.insertBefore(div_child,divList[0]);   
       }else{
        alert("到达队列长度上线，添加失败！");  //不能只alert，要阻断添加，不然的话关闭alert窗口仍然会继续添加队列元素
       }
}  
    
function RightAdd(queue){
    var input = document.getElementById("input");
    var num = input.value;
    if(checkInput(num)){
       var div_child = document.createElement("div");
       div_child.style.display = "inlineBlock";    
       div_child.style.height = num+"px";
       div_child.title=num+"";
       div_child.style.width = "15px";
       div_child.style.marginLeft = "3px";
       div_child.style.marginTop = (200-num)+"px";
       
       div_child.style.cssFloat = "left";
       div_child.style.backgroundColor = "red";
       var divList = queue.childNodes;
    }
       if(divList.length < 60){
        queue.appendChild(div_child); 
       }else{
        alert("到达队列长度上线，添加失败！");  //不能只alert，要阻断添加，不然的话关闭alert窗口仍然会继续添加队列元素
       }
}

function LeftOut(queue){
    var childs = queue.childNodes;
    alert(childs[0].style.height);
    queue.removeChild(childs[0]);
}

function RightOut(queue){
    var childs = queue.childNodes;
    alert(childs[childs.length-1].style.height);
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
    }else if(num<10||num>100){
        alert("输入的数值超过预定范围，请重新输入");
        return false;
    }else return true;
}


 function Bubble_Sort(queue){
   // var eles = queue.querySelectorAll("div");   //这两行代码也是可以的
    //var  len = eles.length;
    var eles = queue.childNodes;
    var len = eles.length;
    for(var i= 0;i<len-1;i++){
        for(var j=0;j<len-1-i;j++){
            if (eles[j].offsetHeight > eles[j+1].offsetHeight) {
                var temp = eles[j].offsetHeight;   //offsetHeight读取到的是高度的数值，而不是字符串
                eles[j].offsetHeight = eles[j+1].offsetHeight;
                eles[j].style.height = eles[j+1].offsetHeight + "px";
                eles[j].style.marginTop = (200-eles[j+1].offsetHeight )+"px";    //没有这句话的时候，排序之后，不同高度的子div是底部对不准的
                eles[j].style.title = eles[j+1].offsetHeight+"";
                alert(eles[j].style.title);
                eles[j+1].offsetHeight = temp;
                eles[j+1].style.height = temp + "px";
                eles[j+1].style.marginTop = (200-temp)+"px";
                eles[j+1].style.title = temp+"";                 
            }
        }
    }
 };


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
    document.getElementById("btn5").onclick = function(){Bubble_Sort(queue);};

        queue.onclick = function(e){
        e = e||window.event;    
        var t = e.target || e.srcElement;  //t:目标对象
        var tagName = t.tagName;　//tagName标签名称
        if( tagName == 'DIV' ) {
        queue.removeChild(t);　
        }
    };
}
window.onload = function(){init();};
