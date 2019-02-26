/*
 * @Author: GuoWei
 * @Date: 2018-11-07 19:58:29
 * @LastEditors: GuoWei
 * @LastEditTime: 2018-11-08 22:14:06
 * @Description: 
 */

//  (function(){



//  })()


var buttonList=document.getElementsByTagName("button");
var content=document.getElementById("contents");
var data=[];


function display() {

    var str = "";
    for (var i = 0; i < data.length; i++) {
        str += `<div class="demo" > ${data[i]}</div>`;
    }
    contents.innerHTML = str;
    
}

 function getInput(){
     var inputStr=document.getElementById("input1").value;
     var strList=inputStr.split(/[^a-zA-Z0-9\u4e00-\u9fa5]+/);
     data = [...data,...strList];
    //data.splice(data.length,0,...strList);
    // console.log(strList);
    display();
 }

 function search(){
    var searchStr=document.getElementById("search_input").value;
    //var numList=document.getElementsByClassName("demo");
    var re=new RegExp(searchStr);
    for(let i in data){
        if(re.test(data[i])){
            console.log(data[i]);
            console.log(content.childNodes[i]);
            content.childNodes[i].style.background="red";
            content.childNodes[i].style.color="white";            
        };
    }
 }

 
 window.onload=function(){
     buttonList[0].addEventListener("click",getInput);
     buttonList[1].addEventListener("click",search);

 }