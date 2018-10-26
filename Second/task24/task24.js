
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
//变量声明

    var nodeArr = [];
    var timer;
    var traversalBtn = document.getElementById('pre_ord');
    var searchBtn = document.getElementById('search_btn');
    var deleteBtn = document.getElementById('del');
    var addBtn = document.getElementById('add_btn');

    var father = document.getElementById('parent');


//绑定事件
    addEventHandler(traversalBtn, 'click',function(){
        init();
        deepTraversal(father);
        render();
    });

    addEventHandler(searchBtn ,'click',function(){
        init();
        deepTraversal(father);
        search();
    });

    //删除与添加节点
    function getTarget(e){
        init();
        var target = e.target;
        target.style.backgroundColor = 'green';
        // var c = target.childNodes[1].className;
        // alert(c);
        addEventHandler(deleteBtn,'click',function(){
            target.remove();
            //init();
        });

        addEventHandler(addBtn,'click',function(){
            var addInput = document.getElementById('add_txt').value;
            var newDiv = document.createElement('div');
            var newClassName ;
       
           // alert(c);
            if(target.childNodes[1]){
                newClassName= target.childNodes[1].className;
            }else{
                newClassName = 'newDiv'
            }
            //alert(newClassName);
            newDiv.className = newClassName;
            var text = document.createTextNode(addInput);
            newDiv.appendChild(text);
            target.appendChild(newDiv);
            init();
            addInput = '';
        })
    }


    //深度遍历算法
    function deepTraversal(node){
        if(node!==null){
            nodeArr.push(node);
            var children = node.children;
            for(var i =0;i<children.length;i++){
                deepTraversal(children[i]);
            }
        }
        return nodeArr;
    }
    //渲染样式函数
    function render(){
        var i = 0;
        nodeArr[i].style.backgroundColor = 'pink';
        timer = setInterval(function(){
            i++;
            if(i<nodeArr.length){
                nodeArr[i-1].style.backgroundColor = "#fff";
                nodeArr[i].style.backgroundColor = 'pink';
            }else{
                clearInterval(timer);
                nodeArr[nodeArr.length-1].style.backgroundColor = "#fff";
            }
        },500);
    }
    //搜索函数
    function search (){
        var oInput =document.getElementById('search_txt').value;
        var i = 0;
        nodeArr[i].style.backgroundColor = 'pink';

        timer = setInterval(function(){
            i++;
            if(i<nodeArr.length){
                if(nodeArr[i].firstChild.nodeValue.trim()==oInput){
                    nodeArr[i-1].style.backgroundColor = "#fff";
                    nodeArr[i].style.backgroundColor = 'red';
                    nodeArr[i].checkFlag = true;
                }else{
                    if(nodeArr[i-1].checkFlag!==true){
                        nodeArr[i-1].style.backgroundColor = "#fff";
                    }
                    nodeArr[i].style.backgroundColor = 'pink';
                }
            }else{
                clearInterval(timer);
                if(nodeArr[nodeArr.length-1].checkFlag!=true){
                    nodeArr[nodeArr.length-1].style.backgroundColor = "#fff";
                }
                
            }
        },500);
    }

//初始化
    function init(){
        nodeArr = [];
        clearInterval(timer);
        var divs = document.getElementsByTagName('div');
        for(var i = 0;i<divs.length;i++){
            divs[i].style.backgroundColor = '#ffffff';
        }
    }



