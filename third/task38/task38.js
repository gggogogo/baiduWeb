

(function () {
    scoreRandom = function (num) {
        let ary = [];
        for (i = 0; i < num; i++) {
            ary.push(Math.floor(Math.random() * 100));
        }
        return ary;
    }
    data = {
        一: scoreRandom(3),
        二: scoreRandom(3),
        三: scoreRandom(3),
        四: scoreRandom(3),
        五: scoreRandom(3),
        六: scoreRandom(3),
        七: scoreRandom(3),
        八: scoreRandom(3),
        九: scoreRandom(3),
        十: scoreRandom(3)
    }

    function SortTable(ele, data) {
        this.ele = ele;
        this.data = data;
        this.curOrder = [];
    };
    SortTable.prototype = {
        init: function () {
            for(let i in this.data){
                curOrder[i]=this.data[i];
            }
            this.render();
        },
        render: function () {
            let table = document.createElement("table");
            var str = `<thead><td>姓名</td><td>语文</td><td>数学</td><td>英语</td></thead>`;
            for (let i in this.curOrder) {
                str += `<tr><td>${i}</td><td>${this.curOrder[i][0]}</td><td>${this.curOrder[i][1]}</td><td>${this.curOrder[i][2]}</td></tr>`;
            }
            table.innerHTML = str;
            this.ele.appendChild(table);
        },
        sort: function (col) {
            this.curOrder.sort(function (m, n) {
                return this.curOrder[m][col - 1] - this.curOrder[n][col - 1];
            })
        }
    };

    let sortTable = new SortTable(document.getElementById("container"), data);
    sortTable.init();
    document.getElementById('test').addEventListener("click",function(){
        sortTable.sort(1);
        console.log(sortTable.curOrder);
    })
})()



// var SortableTable = function(tableEle, data, names, fnGetSort) {
//     this.tableEle = tableEle;
//     this.data = data;
//     this.names = names;
//     this.fnGetSort = fnGetSort;
//     this.curOrder = null;

//     this.init();
// }

// SortableTable.prototype = {
//     init: function() {
//         this.curOrder = [];
//         for (var key in this.data) {
//             this.curOrder.push(key);
//         }

//         this.render();
//     },

//     render: function() {
//         function fn(d) {
//             return '<td>' + d + '</td>';
//         }

//         var items = '<tr>';
//         items += this.names.map(fn).join('');
//         items += '</tr>'

//         for (var i = 0; i < this.curOrder.length; i++) {
//             var name = this.curOrder[i];
//             items += '<tr><td>' + name + '</td>';
//             items += this.data[name].map(fn).join('');
//             items += '</tr>'
//         }

//         this.tableEle.innerHTML = items;

//         this.addSortEle();
//     },

//     addSortEle: function() {
//         var self = this;

//         function addArrowCom(index) {
//             var div = document.createElement('div');
//             div.style.cssText = 'display: inline; width: 12px; height: 0px;';

//             for (var i = 0; i < 2; i++) {
//                 var divArrow = document.createElement('div');
//                 divArrow.style.cssText = 'display: inline-block; width: 0; height: 0;' +
//                     'border-left: 5px solid transparent; border-right: 5px solid transparent;';
//                 divArrow.style.cssText += (i == 0 ?
//                     'border-bottom: 10px solid pink;' :
//                     'border-top: 10px solid pink;');
//                 div.appendChild(divArrow);
//             }

//             var td = self.tableEle.children[0].children[0].children[index];
//             td.appendChild(div);

//             var fn = self.fnGetSort(self.names[index]);

//             addEvent(div.children[0], 'click', function(e) {
//                 self.curOrder.sort(function(d1, d2) {
//                     return -fn(self.data[d1][index - 1], self.data[d2][index - 1]);
//                 })

//                 self.render();
//             })

//             addEvent(div.children[1], 'click', function(e) {
//                 self.curOrder.sort(function(d1, d2) {
//                     return fn(self.data[d1][index - 1], self.data[d2][index - 1]);
//                 })
//                 self.render();
//             })

//             return div;
//         }

//         for (var i = 0; i < this.names.length; i++) {
//             var name = this.names[i];
//             var fn = this.fnGetSort(name);

//             if (fn) {
//                 var ele = addArrowCom(i);
//             }
//         }
//     },


// };



