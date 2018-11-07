function EngNameToChin(a){
    switch (true){
      case(a=="day"):{a="日";break;}
      case(a=="week"):{a="周";break;}
      case(a=="month"):{a="月";break;}
    }
    return a;
  }
  alert(EngNameToChin("day"));




// if((i!=cityContArray.length-1)||(tempMonth==currMonth)){
        //   var currentDate=cityContArray[i].slice(8);   //当前的日期 字符
        //   //将一周的数据处理好
        //   if(parseInt(currentDate)%7 != 0){
        //     weekSum+=eachCityData[cityContArray[i]];
        //     //weekNum=parseInt(currentDate) / 7 + 1;  //第几周
        //     dayCount_week++;
        //     if((i<cityContArray.length-1)&&(cityContArray[i+1].slice(5,7)!=tempMonth)){
        //     var weekAvg=Math.round(weekSum/dayCount_week);   
        //     weekCount++; //取整
        //     everyweek[cityContArray[i].slice(0,7)+"第"+weekCount+"周"]=weekAvg;
        //     weekSum=0;
        //     dayCount_week=0;
        //     weekAvg=0;
        //     weekCount=0;
        //     }
        //   }
        //   else if((i==cityContArray.length-1)||()){
        //     weekSum+=eachCityData[cityContArray[i]];
        //     dayCount_week++;
        //     var weekAvg=Math.round(weekSum/dayCount_week);    //取整
        //     weekCount++;
        //     everyweek[cityContArray[i].slice(0,7)+"第"+weekCount+"周"]=weekAvg;
        //     weekSum=0;
        //     dayCount_week=0;
        //     weekAvg=0;
          
        //   }

        // }
        // else if((i==cityContArray.length-1)||(tempMonth!=currMonth)){
        //   var monthAverage=Math.round(monthsum/dayCount_month);   //取整
        //   everymonth[cityContArray[i-1].slice(0,7)]=monthAverage;
        //   monthAverage=0;
        //   monthsum=0;
        //   dayCount_month=0;
        //   tempMonth=cityContArray[i].slice(5,7);
        //   monthsum+=eachCityData[cityContArray[i]];
        //   dayCount_month++;
        //   weekSum+=eachCityData[cityContArray[i]];
        //   //weekNum=parseInt(currentDate) / 7 + 1;  //第几周
        //   dayCount_week++;
        //   weekCount=0;

        // }