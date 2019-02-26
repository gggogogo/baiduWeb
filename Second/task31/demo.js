var isStudent=document.getElementsByName("isStudent");
var radioSelect=document.getElementById("radio_select");
var city=document.getElementById("city");
    var school=document.getElementById("school");
var schoolData={
    BJ:["北京大学", "清华大学", "北京航空航天大学"],
    SH:["复旦大学", "上海交通大学", "同济大学"],
    NJ:["南京大学","南京邮电大学","东南大学"]
}

function radioChange(){
    if(document.getElementById("is_student").checked){
        document.querySelector("#choice_school").className="";
        document.querySelector("#no_school").className="hide";
    }
    else{
        document.querySelector("#choice_school").className="hide";
        document.querySelector("#no_school").className="";
    }
}

function selectChange(){
    console.log(city.option);
    var selectedCity=city.options[city.selectedIndex].value;
    // school.innerHTML="";
    let str="";
    for(let i=0;i<schoolData[selectedCity].length;i++){
        str+=`<option value="">${schoolData[selectedCity][i]}</option>`;
    }
    school.innerHTML=str;
}
function addEventHandler(ele,type,handler){
    if(ele.addEventListener){
        ele.addEventListener(type,handler,false);
    }
    else if(ele.attachEvent){
        ele.attachEvent("on"+type,handler);
    }
    else{
        ele["on"+type]=handler;
    }
}
addEventHandler(radioSelect,"change",radioChange);
addEventHandler(city,"change",selectChange);

