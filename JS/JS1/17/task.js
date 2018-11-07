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
    var dat = new Date("2016-01-01");    //第一天
    var datStr = '';
    //随机生成91天的空气质量指数
    for (var i = 1; i < 92; i++) {
      datStr = getDateStr(dat);   //将2016-01-01日期类型转化成字符形式
      returnData[datStr] = Math.ceil(Math.random() * seed);     //生成当天的空气质量指数
      dat.setDate(dat.getDate() + 1);
    }
    return returnData;   //以日期作为数组下标
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
  
  function EngNameToChin(a){
    switch(true){
      case(a=="day"):{a="日";break;}
      case(a=="week"):{a="周";break;}
      case(a=="month"):{a="月";break;}
    }
    return a;
  }

//随机生成十六进制颜色
  function randomHexColor() { 
    var hex = Math.floor(Math.random() * 16777216).toString(16); //生成ffffff以内16进制数
    while (hex.length < 6) { //while循环判断hex位数，少于6位前面加0凑够6位
     hex = '0' + hex;
    }
    return '#' + hex; //返回‘#'开头16进制颜色
   }
  /**
   * 渲染图表
   */
  function renderChart() {
     var Time=pageState.nowGraTime;  //字符串
     var City=pageState.nowSelectCity;
     
     var wrapper=document.getElementById("aqi-chart-wrap");
     var width_wrapper=wrapper.clientWidth;   //获得元素可见区域宽度 不包括滚动条的宽
     var chosenData=chartData[Time][City];     //当前页面选择下的数据
     var chosenDataDate=Object.getOwnPropertyNames(chosenData);
     var columnNum=chosenDataDate.length;
     var innerHTML="";  //空 innerHTML会重写
     var perwidth=Math.floor(width_wrapper/(2*columnNum));
     var selectTimeChin=EngNameToChin(Time);
     innerHTML="<div class='title'>"+City+"-"+selectTimeChin+"均空气质量指数"+"</div>";
     for(var i=0;i<columnNum;i++){
       var color=randomHexColor();
        innerHTML+="<div class='pillarData'"+"title='"+chosenDataDate[i]+" AQI:"+chosenData[chosenDataDate[i]]+"'"+"style='background:"+color+";width:"+perwidth+"px;height:"+chosenData[chosenDataDate[i]]+"px;margin-right:"+perwidth+"px;'></div>";
     }
     wrapper.innerHTML=innerHTML;

  
  }
  
  /**
   * 日、周、月的radio事件点击时的处理函数
   */
  function graTimeChange(e) {
    // 确定是否选项发生了变化
    //var chosenTime=this.value;
    var chosenTime=e.value;
    // alert("Timechange")
    if(chosenTime!=pageState.nowGraTime){
      pageState.nowGraTime=chosenTime;
    }
    // 设置对应数据
  
    // 调用图表渲染函数
    renderChart();
  }
  
  /**
   * select发生变化时的处理函数
   */
  function citySelectChange() {
    // 确定是否选项发生了变化 
    var chosenCity=this.value;
    if(chosenCity!=pageState.nowSelectCity){
      pageState.nowSelectCity=chosenCity;
    }
      //select中被选中的值
    // 设置对应数据
    // alert(chosenCity);
    // 调用图表渲染函数
    renderChart();
  }
  
  /**
   * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
   */
  function initGraTimeForm() {
   var timelist = document.getElementsByName("gra-time");
   for(var i = 0;i < timelist.length;i++){
       timelist[i].addEventListener("click",function(event){
        var e = event||window.event;
        if(e.target){
         graTimeChange(e.target);
       }
       
      })
      //timelist[i].addEventListener('click',graTimeChange);

  }
}
  /**
   * 初始化城市Select下拉选择框中的选项
   */
  function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var selectCity=document.getElementById("city-select");
  var innerHTML="";
  for(var city in aqiSourceData){
      //selectCity.innerHTML="<option>"+city+"</option>";
      // var opt=document.createElement("option");
      // var opt_text=document.createTextNode(city);
      // opt.appendChild(opt_text);
      // selectCity.appendChild(opt);
      innerHTML+="<option>"+city+"</option>";
  }
  selectCity.innerHTML=innerHTML;
  //初始化
  var cityArr=Object.getOwnPropertyNames(aqiSourceData);
  pageState.nowSelectCity=cityArr[0];       
    // 给select设置事件，当选项发生变化时调用函数citySelectChange
  // selectCity.addEventListener("change",function(event){
  //     var e = event|window.event;
  //     if(e.target){
  //         citySelectChange(e.target);
  //     }

  // })
  selectCity.addEventListener('change',citySelectChange);
  }
  
  /**
   * 初始化图表需要的数据格式
   */
  function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式
    // 处理好的数据存到 chartData 中
    var allweek={},everyweek={};
    var allmonth={},everymonth={};
    for(var city in aqiSourceData){
      var eachCityData=aqiSourceData[city];
      var cityContArray=Object.getOwnPropertyNames(eachCityData);            //返回属性名构成的数组  日期时间
      var tempMonth=cityContArray[0].slice(5,7);
      var dayCount_month=0,dayCount_week=0,weekCount=0,monthSum=0,weekSum=0,weekNum=0;//第几周
      for(var i=0;i<cityContArray.length;i++){
        var currMonth=cityContArray[i].slice(5,7);
        dayCount_month++;
        monthSum+=eachCityData[cityContArray[i]];    //将数据相加
        dayCount_week++;
        weekSum+=eachCityData[cityContArray[i]];
        if((i==cityContArray.length-1)||(currMonth!=cityContArray[i+1].slice(5,7))||((i+1)%7==0)){
           if((i==cityContArray.length-1)||(currMonth!=cityContArray[i+1].slice(5,7))){
             var monthAvg=Math.round(monthSum/dayCount_month);
             everymonth[cityContArray[i].slice(0,7)]=monthAvg;
             monthSum=0;
             dayCount_month=0;
             monthAvg=0;
           } 
           if(((i+1)%7==0)||(i==cityContArray.length-1)){
            var weekAvg=Math.round(weekSum/dayCount_week);
            weekCount++;
            everyweek["第"+weekCount+"周"]=weekAvg;
            weekSum=0;
            weekAvg=0;
            dayCount_week=0;
           }
           
        }
        
      }
      allweek[city]=everyweek;
      allmonth[city]=everymonth;
      everyweek={};
      everymonth={};
    }
    chartData.day=aqiSourceData;
    chartData.week=allweek;
    chartData.month=allmonth;
    renderChart();
   
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