var allInputData=[];


//绑定事件
function addEvent(){
    var inputList=document.getElementsByTagName("input");
    for(var i=1;i<inputList.length;i++){
        
        switch(i){
            case 1:{
                    inputList[i].addEventListener("click",function(){
                        
                        var input_text=inputList[0].value;
                        if((parseInt(input_text)>10)&&(parseInt(input_text)<100)){
                            allInputData.unshift(input_text);
                            
                            renderQueue();
                        }
                        else{alert("Invalid input,please enter an interger between 10 and 100!");}
                        
                        
                    });
                break;
            }
            case 2:{
                
                    inputList[i].addEventListener("click",function(){
                        var input_text=inputList[0].value;
                        if((parseInt(input_text)>10)&&(parseInt(input_text)<100)){
                            allInputData.push(input_text);
                            renderQueue();
                        }
                        else{alert("Invalid input,please enter an interger between 10 and 100!");}
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
                    break;
            }
            case 5:{
                inputList[i].addEventListener("click",function(){
                    for(var i=0;i<allInputData.length-1;i++){
                        for(var k=0;k<allInputData.length-i;k++){
                            if(allInputData[k]>allInputData[k+1]){
                                var temp = allInputData[k];
                                allInputData[k]=allInputData[k+1];
                                allInputData[k+1]=temp;
                                renderQueue();
                            }
                        }
                        
                    }
                });
                break;
            }
            case 6:{
                
                inputList[i].addEventListener("click",function(){
                    for(var j=0;j<allInputData.length;j++){
                        var index=Math.floor(Math.random()*(allInputData.length));
                        if(j!=index){
                            var tempData=allInputData[j];
                            allInputData[j]=allInputData[index];
                            allInputData[index]=tempData;
                        }
                    }
                    renderQueue();
                });
                break;
            }
            
        }
    }
}

//渲染队列
var bodyCont = document.getElementsByTagName("body")[0];
var wrapper=document.createElement("div");
bodyCont.appendChild(wrapper);
wrapper.setAttribute("id","wrapper");
function renderQueue(){
    var count = allInputData.length;
    wrapper.innerHTML="";
    if(count>60){alert("队列超出范围！");}
    else{
        for(var i=0;i<count;i++){
            var numWrapper = document.createElement("div");
            var num_cont=document.createTextNode(allInputData[i]);
            numWrapper.appendChild(num_cont);
            numWrapper.setAttribute("class","numwrapper");
            numWrapper.style.height=parseInt(allInputData[i])+"px";
            numWrapper.setAttribute("height",parseInt(allInputData[i])+"px");
            numWrapper.setAttribute("title",allInputData[i]);
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
    
}

addEvent();