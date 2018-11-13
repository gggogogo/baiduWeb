


var tagAry=[];
var hobbyAry=[];

function addEventHandler(element,type,handler){
    if(element.addEventListener){
        element.addEventListener(type,handler,false);
    } else if(element.attachEvent){
        element.attachEvent("on"+type,handler);
    }else{
        element["on"+type]=handler;
    }
}
function tagCreate(){
    console.log(event.keyCode);
    if(event.keyCode == 13){
    var tagStr=document.getElementById("tag").value;
    var tagContents=document.getElementById("tag_contents");
    var tagList=tagStr.split(/[\r\s]/);
    tagAry=[...tagAry,...tagList]
    tagAry=unique(tagAry);
    if(tagAry.length>10){
        tagAry.splice(0,tagList.length-10);
    }
    display(tagAry,tagContents);
}
}

function hobbyCreat(){
    var hobbyStr=document.getElementById("hobby").value;
    var hobbyContents=document.getElementById("hobby_contents");
    var strList=hobbyStr.split(/[^a-zA-Z0-9\u4e00-\u9fa5]+/);
    hobbyAry = [...hobbyAry,...strList];
    hobbyAry=unique(hobbyAry);
    if(hobbyAry.length>10){
        hobbyAry.splice(0,hobbyAry.length-10);
    }
    display(hobbyAry,hobbyContents);
}

function display(list,position){
    var str = "";
    for (var i = 0; i < list.length; i++) {
        str += `<div class="cell" > ${list[i]}</div>`;
    }
    position.innerHTML = str;
}

//数组去重
function unique(array){
    return [... new Set(array)];
}

var confirmInput=document.getElementById("confirm");
var tag=document.getElementById("tag");
var tagContents=document.getElementById("tag_contents");
window.onload=function(){
    addEventHandler(tag,"keyup",tagCreate);
    addEventHandler(confirmInput,"click",hobbyCreat);
    tagContents.onmouseover=function(e){
        console.log(e.target);
       // e.target.value="shanchu"+e.target.value;
       //if(e.target&&e.targe)
       e.target.firstChild.insertData(0,'删除');
        e.target.style.background = 'gray';
    }
    addEventHandler(tagContents,'mouseout',function(e){
        
            e.target.firstChild.deleteData(0,2);
            e.target.style.background = 'coral';
        
    });
}