var data =[];
$ = function (el) { return document.querySelector(el); };
function insertText(div_wrapper){
    var reg = new RegExp("^[A-Za-z0-9\u4e00-\u9fa5]+");
    var inputtext = document.getElementById("textarea").value.trim();
    
    if(!(reg.test(inputtext))){
        alert("请输入中文、数字或者英文：");
        return false;
    }
    var arrWord = inputtext.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/).filter(function(e) {
        if (e != null && e.length > 0) {
            return true;
        } else {
            return false;
        }
    });

//     var mon=inputtext.split(/[,\s、\r]/);
//    for(var i = 0;i<mon.length;i++){
//         var div = document.createElement("div");
//         div.style.display="inline";
//         div.style.marginLeft ="5px";
//         div.innerHTML = mon[i];
//         div.style.backgroundColor = "pink";
//         div.style.left = "5px";
//         div_wrapper.appendChild(div);   
//    }
   data = data.concat(arrWord);
   render();            //不传参数的时候，render函数里面的if语句不会执行   直接执行 return "<div>" + r + "</div>";，，，，相当于在div_wrapper容器中添加子div
}

function render(match) {
document.getElementById("div_wrapper").innerHTML=
//$('#div_wrapper').innerHTML =
      data.map(function(d) {
        var r = d;
        if (match != null && match.length > 0) {
          r = r.replace(new RegExp(match, "g"), "<span class='select'>" + match + "</span>");
        }
        return "<div>" + r + "</div>";
      }).join('');
  } 

function init(){
    var div_wrapper = document.getElementById("div_wrapper");
    var s = document.getElementById("text").value;
    
    document.getElementById("btn1").onclick = function(){insertText(div_wrapper);};
    document.getElementById("btn2").onclick = function(){render(document.getElementById("text").value);};   //我i啥这里传进来s参数就不可以
}

init();





var flipAndInvertImage = function(A) {
    for(var i = 0;i < A.length; i++){
        for(var j = 0; j < A.length; j++){
            if(!(A[i][j]==0||A[i][j]==1)){
                return false;
            }
            var temp = A[i][j];
            A[i][j] = A[j][i];
            A[j][i] = temp;            
        }
    }
    for(var k =0; k <A.length; k++){
        for(var m = 0; m < A[0].length; m++){
            if(A[i][j] ==1){
                A[i][j] = 0;
            }else{
                A[i][j] = 1;
            }
        }
    }
   return A; 
    
};