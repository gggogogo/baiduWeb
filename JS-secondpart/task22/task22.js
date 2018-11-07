var btn = document.getElementsByTagName("input");
var preButton = btn[0];
var inButton = btn[1];
var lastButton = btn[2];
var treeNodes =[];
var treeRoot = document.getElementsByClassName("box")[0];
var timer = null;


window.onload = function(){
    preButton.onclick = function(){
        reset();
        preBtn(treeRoot);
        for(var i = 0; i<treeNodes.length; i++){
             console.log(treeNodes[i]);
        }
        changeColor();
    }
    inButton.onclick = function(){
        reset ();
        inBtn(treeRoot);
       
        changeColor();
    }
    lastButton.onclick = function(){
        reset();
        lastBtn(treeRoot);
        changeColor();
    }
}


function preBtn(node){
    if(!(node == null)){
        treeNodes.push(node);      
        preBtn(node.firstElementChild);
        preBtn(node.lastElementChild);
    }
}
function inBtn(node){
    if(!(node ==null)){
        inBtn(node.firstElementChild);
        treeNodes.push(node);
        inBtn(node.lastElementChild);
    }
}

function lastBtn(node){
    if(!(node ==null)){               //node不为空的时候的执行操作
        lastBtn(node.firstElementChild);
        lastBtn(node.lastElementChild);
        treeNodes.push(node);
    }
}
function changeColor(){
    var i = 0;
    treeNodes[i].style.backgroundColor = "#63B8FF";    //使遍历的第一个节点改变背景颜色
    timer = setInterval(function(argument){
        i++;
        if(i < treeNodes.length){
            treeNodes[i-1].style.backgroundColor = "white";  //使上一个节点变成原始颜色
            treeNodes[i].style.backgroundColor = "#63B8FF";  //使当前节点改变背景颜色
        }else{
            
            clearInterval(timer);                            //清除clearInterval()
            treeNodes[i-1].style.backgroundColor = "white";  //因为又执行i++，所以如果改变组后一个元素颜色需要i-1
        }
    },700)
}


function reset(){
    treeNodes = [];
    clearInterval(timer);
    var div = document.getElementsByTagName("div");
    for(var i = 0; i<div.length; i++){
        div[i].style.backgroundColor = "white";
    }

    }

