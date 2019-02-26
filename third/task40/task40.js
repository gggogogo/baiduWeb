var Calendar = function (ele) {
    this.ele = ele;
    this.date = new Date();
    this.year = this.date.getFullYear();
    this.month = this.date.getMonth();
    this.monthFirDay = new Date(this.year, this.month, 1).getDay();
}

Calendar.prototype = {
    init: function () {
        this.ele.appendChild(this.createDiv());
    },
    createDiv:function(){
        var div=document.createElement('div');
        div.innerHTML=`
        <div class="head">
        <span class="left-arw"><-</span>
        <span class="year-month">${this.year}年${this.month + 1}月</span>
        <span class="right-arw">-></span>
        </div>`;
        div.appendChild(this.createTable());
        return div;
    },
    createTable: function () {
        var table = document.createElement('table');
        var str = '';
        str = `<thead>
        
        <tr>
                <td>日</td>
                <td>一</td>
                <td>二</td>
                <td>三</td>
                <td>四</td>
                <td>五</td>
                <td>六</td>
            </tr>
                    </thead>`;
        str += "<tr>"
        if (this.date.getDay() == 0) {

            str += this.thisMonth();
        }
        else {
            str += this.lastMonth();
            str += this.thisMonth();
        }
        table.innerHTML=str;
        return table;
    },
    lastMonth: function () {
        var temp;
        var str = "";
        temp = this.judgeMonDay(this.year, this.month - 1) - this.monthFirDay+1;
        for (let i = 0; i < this.monthFirDay; i++) {
           
            console.log(this.judgeMonDay(this.year, this.month - 1) );
            str += `<td style="color:gray";">${temp}</td>`
            temp++;
        }
        return str;
    },
    thisMonth: function () {
        var str = "";
        let i =1
        for (i; i < 8 - this.monthFirDay; i++) {
            str += `<td>${i}</td>`
        }
        str += "</tr>";
       let flag=0;
        for(i;i<=this.judgeMonDay(this.year,this.month);i++){
            if(flag%7==0){
                str += "<tr>";
            }
            str += `<td>${i}</td>`;
            if(flag%7==6){
                
            }
            flag++;
        }
        if(flag%7!=6){
            for(let i=1;i<8-flag%7;i++){
                str += `<td style="color:gray";>${i}</td>`;
            }
            str += "</tr>";
        }
        return str;
    },
    judgeMonDay: function (year, month) {
        return new Date(year, month + 1, 0).getDate();
    }

}

var can = new Calendar(document.getElementById("container"));
can.init();