/*
 * @Author: GuoWei
 * @Date: 2018-10-18 20:33:37
 * @LastEditors: GuoWei
 * @LastEditTime: 2018-11-06 16:20:21
 * @Description: 
 */

/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */


var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var city = document.getElementById("aqi-city-input").value.trim();
    var val = document.getElementById("aqi-value-input").value.trim();


    //利用正则表达式判断输入是否符合要求
    ///^[A-Za-z\u4E00-\u9FA5]+$/
    if (!city.match(/^[A-Za-z\u4E00-\u9FA5]+$/)) {
        alert("输入的城市名必须为中英文字符!");
        return;
    }
    if (!val.match(/^\d+$/)) {
        alert("空气质量指数必须为整数");
        return;
    }
    aqiData[city] = val;

}

/**
 * 渲染aqi-table表格  
 */
//每次渲染整个表格，在数据量较大的情况下造成资源浪费    
function renderAqiList() {
    var tab = document.getElementById("aqi-table");
    //每次重置表格
    tab.innerHTML = "";
    for (var city in aqiData) {
        if (tab.children.length===0) {
            tab.innerHTML = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
        }
        var tr = document.createElement("tr");

        //  createElement方法麻烦
        // var td1 = document.createElement("td");
        // var td2 = document.createElement("td");
        // var td3 = document.createElement("td");
        // var text1=document.createTextNode(city);
        // td1.appendChild(text1);
        // td3.innerHTML= "<button class=‘del-btn’ >删除</button>" ;
        // tr.appendChild(td1);
        // tr.appendChild(td2);
        // tr.appendChild(td3);

        tr.innerHTML="<td>"+city+"</td><td>"+aqiData[city]+"</td><td><button class=‘del-btn’ >删除</button></td>";
        tab.appendChild(tr);
    }
    
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(target) {
    // do sth.  
    var key=target.parentElement.parentElement.firstChild.innerHTML;
    delete aqiData[key];
    renderAqiList();
}
// function delBtnHandle(target) {
//     // do sth.
//     var tr = target.parentElement.parentElement;
//     var strCity =tr.firstChild.innerHTML; 
//     //tr.children[0].innerHTML;
//     delete aqiData[strCity];
//     renderAqiList();
// }

function init() {

    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    var btnAdd = document.getElementById("add-btn");
    btnAdd.onclick = addBtnHandle;
    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    var tab = document.getElementById("aqi-table");
    var  btnDel=tab.getElementsByClassName("del-btn");
   
   tab.onclick=function(e){
        delBtnHandle(e.target);
   }
//    btnDel.addEventListener("click",function(e){
//        delBtnHandle(e.target);
//    })
}

init();