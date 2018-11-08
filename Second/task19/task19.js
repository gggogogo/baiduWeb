/*
 * @Author: GuoWei
 * @Date: 2018-11-05 14:40:37
 * @LastEditors: GuoWei
 * @LastEditTime: 2018-11-08 14:56:04
 * @Description: 
 */
var inputValue = document.getElementById("input_value");
var buttonList = document.getElementsByTagName("button");
var contents = document.getElementById("contents");
var data = [10, 88, 15, 19, 36, 77, 66, 19, 99, 76, 48, 37, 22, 16, 97, 93, 39, 35, 23, 24, 45, 67, 78, 89, 90, 21, 99];
function isNum(value) {
    return /(^[1-9][0-9]$)|(^100$)/.test(value);
}
//  //以字母开头，长度在6~18之间，只能包含字母、数字和下划线

//  console.log( /^[0-9a-zA-Z]+[@][0-9a-zA-Z]+\.((com)|(cn)|(edu))$/.test("qq122211111111@12.com"));

//  / ^[0-9a-zA-Z]+[@][0-9a-zA-Z]+[.][a-zA-Z]$/

addEventHandler(buttonList[0], "click", function () {
    var val = inputValue.value;
    if (isNum(val)) {
        if (data.length < 61) {
            data.unshift(val);
            display();
        }
        else {
            alert("");
        }
    }
    else {
        alert("请输入10-100的数字");
    }
})

addEventHandler(buttonList[1], "click", function () {
    var val = inputValue.value;
    if (isNum(val)) {
        data.push(val);
        display();
    }
    else {
        alert("请输入10-100的数字");
    }

})
addEventHandler(buttonList[2], "click", function () {
    data.shift();
    display();

})
addEventHandler(buttonList[3], "click", function () {
    data.pop();
    display();

})

function display() {

    var str = "";
    for (var i = 0; i < data.length; i++) {
        str += `<div class="num" style=" width:20px; height:${data[i] * 5}px"> <span>${data[i]}</span></div>`;
    }
    contents.innerHTML = str;

}


//直接在冒泡排序中暂停
//没有暂停，还是一次性排完
addEventHandler(buttonList[4], "click", bubbleSort);

function bubbleSort() {
    var index = 1;
    for (let i = data.length; i > 0; i--) {
        for (let j = 1; j < i; j++) {
            index++;
            setTimeout(function(j){
                return ()=>{
                    if (data[j + 1] < data[j]) {
                        let temp = data[j];
                        data[j] = data[j + 1];
                        data[j + 1] = temp;
                        display();
                    }    
                }                
            }(j), 100*index);
           
        }
    }
}



    //将排序的每一步的数组状态都保存下来再展示
    // addEventHandler(buttonList[4],"click",function(){
    //     bubbleSort();
    //     // setTimeout(render,100);
    //     render();
    // });
    // var state=[];
    // function bubbleSort(){    
    //     for(let i=data.length;i>0;i--){
    //         var flag=false;
    //         for(let j=0;j<i;j++){       
    //             if(data[j+1]<data[j]){
    //                 let temp=data[j];
    //                 data[j]=data[j+1];
    //                 data[j+1]=temp;
    //                 flag=true;
    //                 state.push(data.slice(0));
    //             }
    //         }
    //         if(flag=false){
    //             break;
    //         }
    //     }
    // }
    // function render(){

    //     setTimeout(function demo2(){
    //         if(s = state.shift()){
    //             var str = "";
    //             for (var i = 0; i < data.length; i++) {
    //                 str += `<div class="num" style=" width:20px; height:${s[i]*5}px"> <span>${s[i]}</span></div>`;
    //             }
    //             contents.innerHTML = str;
    //             setTimeout(demo2,100);
    //         }
            
    //     },100);
    // }


    addLoadEvent(display);