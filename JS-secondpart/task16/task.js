/**
 * 题目主要要求：
 * 用户输入城市名称和空气质量指数后，点击“确认添加”按钮后，就会将用户的输入在进行验证后，添加到下面的表格中，新增一行进行显示
·*  用户输入的城市名必须为中英文字符，空气质量指数必须为整数
 *  用户输入的城市名字和空气质量指数需要进行前后去空格及空字符处理（trim）
 *  用户输入不合规格时，需要给出提示（允许用alert，也可以自行定义提示方式）
 *  用户可以点击表格列中的“删除”按钮，删掉那一行的数据
 * 
 * 
 * 
 * 
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
    var city_name = document.getElementById("aqi-city-input").value.trim();           
    var aqi_value = Number(document.getElementById("aqi-value-input").value.trim());
    if (!(!isNaN(aqi_value) && aqi_value % 1 === 0)){
        alert("空气质量请输入整数值：");
        return;
    }else{
        aqi_value= aqi_value;
    }
    var regx = /^[A-Za-z\u4E00-\u9FA5]+$/;
    
    if(regx.test(city_name))
    {
        city_name = city_name;
    } else {
        alert("请输入中文：");
        return;
    }   

    // if (!city_name.match(/^[A-Za-z\u4E00-\u9FA5]+$/)) {
    //     alert("请输入文字");
    //     return;
    // }
    // if (!aqi_value.match(/^\d+$/)) {
    //     alert("请输入整数");
    //     return;
    // }
    aqiData[city_name] = aqi_value;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var table = document.getElementById("aqi-table");
    table.border = 1;
    table.innerHTML = "";                                               //一开始缺少这句话，删除按钮点击时会在下面一直添加
    for (var city_name in aqiData) {
        if (table.children.length === 0) {
            table.innerHTML = "<tr> <td>城市</td> <td>空气质量</td> <td>操作</td> </tr>";
        }
        var tr = document.createElement("tr");
        var td1 = document.createElement("td");
        td1.innerHTML = city_name;
        tr.appendChild(td1);
        var td2 = document.createElement("td");
        td2.innerHTML = aqiData[city_name];
        tr.appendChild(td2);
        var td3 = document.createElement("td");
        var button = document.createElement("button");
        button.className = "deleteButton";
        var text = document.createTextNode("删除");
        button.appendChild(text);
        td3.appendChild(button);
        tr.appendChild(td3);
        table.appendChild(tr);
        
    }                                                                //一开始这半个分号放在if语句后面的,,按钮操作会出现比较多的问题
    
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
    var tr = target.parentElement.parentElement;
    var city_name = tr.children[0].innerHTML;
    delete aqiData[city_name];
    renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    var add_btn = document.getElementById("add_btn");
    add_btn.onclick = addBtnHandle;
   

  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    var table = document.getElementById("aqi-table");
    var deletebutton = table.getElementsByClassName("deleteButton");
    table.addEventListener("click", function(e) {
        if (e.target && e.target.nodeName === "BUTTON") {
            delBtnHandle(e.target);
        }
    })

}

init();
