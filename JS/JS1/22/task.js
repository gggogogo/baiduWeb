var nodeList = [];
var root = document.getElementsByClassName("wrapper")[0];
//添加事件
function addEvent(tag){
    var elemList = document.getElementsByTagName(tag);
    for(var k = 0;k< elemList.length;k++){
        elemList[k].addEventListener("click",function(){
            var that = this;
            traverseNodes(that);
            addColor();
        });
    }
}

function traverseNodes(that){
    var traverseMethod = that.value;
    switch (traverseMethod){
        case "前序":{
           reset();
           preTrav(root);
           break;
        }
        case "中序":{
            reset();
           inorderTrav(root);
           break;
        }
        case "后序":{
            reset();
            postTrav(root);
            break;
        }
    }
}

//前序遍历
function preTrav(node){
   if(!(node == null)){
       nodeList.push(node);
       preTrav(node.firstElementChild);
       preTrav(node.lastElementChild);
   }
}

//中序遍历
function inorderTrav(node){
    if(!(node == null)){
        inorderTrav(node.firstElementChild);
        nodeList.push(node);
        inorderTrav(node.lastElementChild);
    } 
}

//后序遍历
function postTrav(node){
    if(!(node == null)){
        postTrav(node.firstElementChild);
        postTrav(node.lastElementChild);
        nodeList.push(node);
    }
}

//初始化遍历顺序结点队列
function reset(){
   nodeList = [];
   divList = document.getElementsByTagName("div");
   for(var i=0;i<nodeList.length;i++){
    //    divList[i].setAttribute("class","subwrapper not_trav");
    divList[i].style.background = "#fff";
   }
}

//为遍历的结点添加背景颜色
function addColor(){
    var divList = document.getElementsByTagName("div");
    var divLength = divList.length;
    // divList[0].setAttribute("class","subwrapper traversed")
    nodeList[0].style.background = "gray";
    var j=1;
    var change = function(){
        if(j<divLength){
            nodeList[j-1].style.background = "#fff";
            nodeList[j].style.background = "gray";
            j++;
            return change;
         }
         else{
             clearInterval(timer);
             nodeList[j-1].style.background = "#fff";
             return change;
         }
    }
    timer = setInterval(change(),500);
    // timer = setInterval((function change(){
    //      if(j<divLength){
    //         nodeList[j-1].style.background = "#fff";
    //         nodeList[j].style.background = "gray";
    //         j++;
    //         return change;
    //      }
    //      else{
    //          clearInterval(timer);
    //          nodeList[j-1].style.background = "#fff";
    //          return change;
    //      }
    // })(),1000);
   
}
window.onload = addEvent("input");