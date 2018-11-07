var arrData1=[];
var arrData2=[];
function acquireCont(id,maxHobbyNum){
    if(id.length!=0){
        var elem=document.getElementById(id);
        var elem_text=elem.value.trim();   //注意兼容性写法
        if(elem_text){
            var currData=elem_text.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/);
            //去重
            currData=currData.filter(function(item){
                if(arrData2.indexOf(item) == -1){
                    return true;
                }
            });
            arrData2=arrData2.concat(currData);   //拼接
            //移除超过最大容量的数据
            for(var i=arrData2.length;i>maxHobbyNum;i--){
                arrData2.shift();
            }
            
        }
    }
}
function renderData(id){
    var insertElemBefo = document.getElementById(id);
    var wrapper = document.createElement("div");
    insertAfter(wrapper,insertElemBefo);
    wrapper.innerHTML = arrData2.map(function(item){
       return item="<div class='perData2'>"+item+"</div>";
    }).join("");

}
function insertTag(){
  var Reg = new RegExp(/[\r\, ]$/);
  if(this.value.match(Reg)){
     renderData(this.id);
  }
}
function insertAfter(newElem,targetElem){
    var parent = targetElem.parentNode;
    if(targetElem == parent.lastChild){
        parent.appendChild(newElem);
    }
    else{
        parent.insertBefore(newElem,targetElem.nextSibling);
    }
}
function addEvent(id1,id2,event){
   var elem = document.getElementById(id1);
   elem.addEventListener(event,function(){
    acquireCont(id2,10);
       renderData(id1);
   });
}
window.onload=function init(){
    var input1=document.getElementById("input1");
    input1.change=function(){
        insertTag();
    };
    addEvent("input2","hobbyInput","click");
}();