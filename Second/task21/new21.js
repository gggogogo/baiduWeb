/**
 * Created by Administrator on 2018/10/23.
 */
/**
 * Created by Administrator on 2018/8/26.
 */

var tag = document.getElementById('tag');
var interest = document.getElementById('interest');
var tagContainer = document.getElementById('tagContainer');
var interestContainer = document.getElementById('interestContainer');
var btn = document.getElementById('btn');

//事件兼容函数
function addEventHandler(element,type,handler){
    if(element.addEventListener){
        element.addEventListener(type,handler,false);
    }else if(element.attachEvent){
        element.attachEvent("on"+type,handler);
    }else{
        element["on"+type] = handler;
    }
}


//输入内容裁剪
function splitData(str){
    var inputData = str.trim().split(/[,，;；、。.\s\n]+/);
    return inputData;
}


window.onload = function(){
    //事件绑定
    addEventHandler(tag,'keyup',showTag);
    addEventHandler(btn,'click',showInterest);
    addEventHandler(tagContainer,'mouseover',function(e){
        if(e.target && e.target.nodeName =='LI'){
            e.target.firstChild.insertData(0,'点击删除');
            e.target.style.background = 'gray';

        }
    });
    addEventHandler(tagContainer,'mouseout',function(e){
        if(e.target && e.target.nodeName =='LI'){
            e.target.firstChild.deleteData(0,4);
            e.target.style.background = 'red';
        }
    });
    addEventHandler(tagContainer,'click',function(e){
        if(e.target&&e.target.nodeName =='LI'&& e.target.style.background=='gray'){
            tagContainer.removeChild(e.target);
        }
    });
}


    //实例化对象
var tagObj = new Create(tagContainer);
var interestObj = new Create(interestContainer);

    //构造函数与原型模式相结合
function Create(divList){
    //用来放数据
    this.queue = [];
    //渲染函数
    this.render = function(){
        var str = '';
        for(var i in this.queue){
            str += '<li>'+ this.queue[i]+'</li>';
        }
        divList.innerHTML = str;
    }
}

Create.prototype.rightPush = function(str){
    this.queue.push(str);
    this.render();
};
Create.prototype.leftShift = function(){
    this.queue.shift();
    this.render();
};

//tag中数据的变化
function showTag(){
    if (/[,，;；、\s\n]+/.test(tag.value) || event.keyCode == 13) {
        var data = splitData(tag.value);
        var newTag = data[0];
        if(tagObj.queue.indexOf(newTag)===-1){
            tagObj.rightPush(newTag);
            if(tagObj.queue.length>10){
                tagObj.leftShift();
            }
        }
        tagObj.render();
        tag.value = '';
    }
}

//interest中数据的变换
function showInterest(){
    var data = splitData(interest.value);
    data.forEach(function(e){
        if(interestObj.queue.indexOf(e)===-1){
            interestObj.rightPush(e);
            if(interestObj.queue.length>10){
                interestObj.leftShift();
            }
        }
        interestObj.render();
        interestObj.value = '';
    });
}

