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
 var cityElem=document.getElementById("aqi-city-input");
 var qualityElem=document.getElementById("aqi-value-input");
// var city=cityElem.value.trim();    //trim()只能去除字符串两头的空格
 var city=cityElem.value.replace(/\s*/g,"");
 var quality=qualityElem.value.trim();
 if(!(/^[a-zA-Z\u4E00-\u9FA5]+$/.test(city))){
   alert("Input is invalid!");
   return;
 }
//  if(!city.match(/^[A-Za-z\u4E00-\u9FA5]+$/)){
//   alert("Input is invalid!");
//   return;
//  }
 if(!(/^[0-9]+$/g.test(quality))){
  alert("Input is invalid!");
  return;
}
  aqiData[city]=quality;

}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {

var table=document.getElementById("aqi-table");
table.innerHTML="";    //清除上一次添加后的的所以表格内容

var tableheader=document.createElement("tr");
table.appendChild(tableheader);
var cityname=document.createElement("td");
var cityname_text=document.createTextNode("城市");
cityname.appendChild(cityname_text);
var airQualitytit=document.createElement("td");
var airQualitytit_text=document.createTextNode("空气质量");
airQualitytit.appendChild(airQualitytit_text);
var operTit=document.createElement("td");
var operTit_text=document.createTextNode("操作");
operTit.appendChild(operTit_text);
tableheader.appendChild(cityname);
tableheader.appendChild(airQualitytit);
tableheader.appendChild(operTit);
var dataCount=aqiData.length;
for(var city in aqiData){
   var tr=document.createElement("tr");
   table.appendChild(tr);
   tr.innerHTML="<td>"+city+"</td><td>"+aqiData[city]+"</td><td><button class='del-btn'>删除</button></td>";
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
function delBtnHandle(node) {
  // do sth.
// var parent=this.parentNode.parentNode;
// var delContent=parent.getElementsByTagName("td")[0];
// var delCity=delContent.value;
// delete aqidata[delCity];
var parent=node.parentNode.parentNode; //定位到要删除的行tr
var delContent=parent.getElementsByTagName("td")[0];
var delCity=delContent.innerHTML;
delete aqiData[delCity];
  renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
var addButt=document.getElementById("add-btn");
addButt.onclick=addBtnHandle;
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
// var table=document.getElementById("aqi-table");
// var delbut=table.getElementsByClassName("del-btn");
// for(var i=1;i<delbut.length;i++){
//   delbut[i].onclick=delBtnHandle;
// }
var table=document.getElementById("aqi-table");
var arrBtnDel=table.getElementsByClassName("del-btn");
table.addEventListener("click",function(event){
  var e = event||window.event;
  var node = e.target;
  if(node && node.nodeName.toLowerCase()=="button"){
    delBtnHandle(node);
  }
})
}


window.onload = function(){
  init();
}
