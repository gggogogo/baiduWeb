/*
 * @Author: GuoWei
 * @Date: 2018-10-23 20:32:47
 * @LastEditors: GuoWei
 * @LastEditTime: 2018-10-23 22:35:06
 * @Description: 
 */

/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = '';
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: -1,
    nowGraTime: "day"
}
pageState.nowSelectCity = "北京";

/**
 * 渲染图表
 */
function renderChart() {
    var wrapper = document.getElementsByClassName("aqi-chart-wrap")[0];
    // console.log("wrapper",wrapper);
    var width;
    switch (pageState.nowGraTime) {
        case "day":
            width = 6;
            break;
        case "week":
            width = 42;
            break;
        case "month":
            width = 180;
            break;
    }

    var str = "";
    for (var time in chartData) {
        str += `<div class = "inline" style="width:${width}px; height:${chartData[time]}px; background:red;"></div>`;
    }
    wrapper.innerHTML = str;
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
    // 确定是否选项发生了变化 
    if(pageState.nowGraTime==this.value){
        return;
    }
    else{
        pageState.nowGraTime=this.value;
        console.log(this.value);
    }
    // 设置对应数据
    initAqiChartData();
    // 调用图表渲染函数
    renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
    // 确定是否选项发生了变化 
    pageState.nowSelectCity=this.value;
    // 设置对应数据
    initAqiChartData();
    // 调用图表渲染函数
    renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    var radio=document.getElementsByName("gra-time");
    for(var i=0;i<radio.length; i++){
        radio[i].addEventListener("click",graTimeChange);
    }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    var cityList=document.getElementById("city-select");
    var str="";
    for(var city in aqiSourceData){
        str+=`<option>${city}</option>`;
    }
    cityList.innerHTML=str;
    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    cityList.addEventListener("change",citySelectChange);
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式
    // 处理好的数据存到 chartData 中
    chartData={};
    var source = aqiSourceData[pageState.nowSelectCity];
    switch (pageState.nowGraTime) {
        case "day":
            chartData = source;
            break;
        case "week":
                var weekth = 0;
                var dayth = 0;
                var sum = 0;
            for (var date in source) {  
                sum += source[date];
                dayth++;
                if (new Date(date).getDay() == 0) {
                    chartData[weekth] = sum / dayth;
                    weekth++;
                    dayth = 0;
                    sum = 0;
                }
            }
            break;
        case "month":
                var monthth=0;
                var dayth=0;
                var sum=0;
            for(var date in source){
                if (new Date(date).getDate() == 31||(new Date(date).getMonth()==1&&new Date(date).getDate()==28)) {
                    chartData[monthth] = sum / dayth;
                    monthth++;
                    dayth = 0;
                    sum = 0;
                }
                sum += source[date];
                dayth++;
            }

    }
}


/**
 * 初始化函数
 */
function init() {
    initGraTimeForm()
    initCitySelector();
    initAqiChartData();
}

init();
