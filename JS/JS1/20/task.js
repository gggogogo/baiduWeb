var arrData=[];   //存放分割好的字符串数组



function acquireCont(){
    var textArea=document.getElementsByTagName("textarea")[0];
    var cont_text=textArea.value.trim();
    if(cont_text){
        var currData=cont_text.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/);
        arrData=arrData.concat(currData);
        
    }
}
var body=document.getElementsByTagName("body")[0];
var wrapper = document.createElement("div");
body.appendChild(wrapper);


var buttonList=document.getElementsByTagName("input");
function addEvent(){
    for(var k=0;k<buttonList.length;k++){
        switch (k){
            case 0:{
                buttonList[0].addEventListener("click",function(){
                    acquireCont();
                    renderData();
                });
                break;
            }
            case 2:{
                buttonList[2].addEventListener("click",searchFunc);
                break;
            }
        }
    }
    
}

function searchFunc(){
  var searchInput=document.getElementsByTagName("input")[1];
  var searchCont=searchInput.value.trim();
//   for(var i = 0;i<arrData.length;i++){
//       if(arrData[i].match(searchCont)){
//         arrData[i]=arrData[i].replace(new RegExp(searchCont,"g"),"<span class='select'>"+searchCont+"</span>");
//       }
//   }
  renderData(searchCont);
//   arrData=arrData.map(function(item){
//       return item.replace(new RegExp("<span class='select'>"+searchCont+"</span>","g"),searchCont);   //将改变了数据再便会原始数据
//   })
}

// function markCont(e){
//      var currPerDiv=document.getElementsByClassName("arrmember");
//      if(currPerDiv){
//         currPerDiv[e].innerHTML="";
//         currPerDiv[e].innerHTML="<div class='arrmember'>"+arrData[e]+"</div>";
//      }
// }

//渲染
// function renderData(){
//     var innerHTML="";
//     for(var i=0;i<arrData.length;i++){
//        innerHTML+="<div class='arrmember'>"+arrData[i]+"</div>";
//     }
//     wrapper.innerHTML = innerHTML;
// }

function renderData(str){
    wrapper.innerHTML = arrData.map(function(item){
        if(str){
            var arrDataSearch = arrData.map(function(item){
                item = item.replace(new RegExp(str,"g"),"<span class='select'>"+str+"</span>");
            });
        }
        return "<div>"+item+"</div>";
    }).join('');

}

window.onload=addEvent();
