var allInputData=[];


//绑定事件
function addEvent(){
    var inputList=document.getElementsByTagName("input");
    for(var i=1;i<inputList.length;i++){
        
        switch(i){
            case 1:{
                    inputList[i].addEventListener("click",function(){
                        
                        var input_text=inputList[0].value;
                        if(/^[0-9]+$/g.test(input_text)){
                            allInputData.unshift(input_text);
                            // allInputData.push(input_text);
                            // var inputDataCopy = allInputData;
                            // allInputData[0]=inputDataCopy[inputDataCopy.length-1];
                            // for(var j=1;i<inputDataCopy.length;j++){
                            //     allInputData[j] = inputDataCopy[j-1];
                            // }
                            renderQueue();
                        }
                        else{alert("Please enter an interger!");}
                        
                        
                    });
                break;
            }
            case 2:{
                
                    inputList[i].addEventListener("click",function(){
                        var input_text=inputList[0].value;
                        if(/^[0-9]+$/g.test(input_text)){allInputData.push(input_text);renderQueue();}
                        else{alert("Please enter an interger!");}
                    });
                break;
            }
            case 3:{
                
                    inputList[i].addEventListener("click",function(){
                        allInputData.reverse();
                        var theLeft=allInputData.pop();
                        allInputData.reverse();
                        alert(theLeft);
                        renderQueue();
                        
                    });
                break;
            }
            case 4:{
                
                    inputList[i].addEventListener("click",function(){
                        var theRight=allInputData.pop();
                        renderQueue();
                        alert(theRight);
                    });
                
            }
            break;
        }
    }
}

//渲染队列
var bodyCont = document.getElementsByTagName("body")[0];
var wrapper=document.createElement("div");
bodyCont.appendChild(wrapper);
function renderQueue(){
    var count = allInputData.length;
    wrapper.innerHTML="";
    for(var i=0;i<count;i++){
        var numWrapper = document.createElement("div");
        var num_cont=document.createTextNode(allInputData[i]);
        numWrapper.appendChild(num_cont);
        numWrapper.setAttribute("class","numwrapper");
        wrapper.appendChild(numWrapper);
        numWrapper.addEventListener("click",function(i){
            return function(){
                allInputData.splice(i,1);  //删除输入数据数组中对应的数据
                numWrapper.innerHTML = "";
                renderQueue();
            };
        }(i));
        
        
    }
}

addEvent();