(function () {

    function createMap(raw, col) {
        for (let i = 0; i < raw; i++) {
            let tr = document.createElement("tr");
            let str = "";
            for (let j = 0; j < col; j++) {
                str += `<td></td>`;
            }
            tr.innerHTML = str;
            this.appendChild(tr);
        }
    }
    function createMoveBlock(raw, col) {
        var div = document.createElement('div');
        div.style.position = 'absolute';
        // div.style.left=`${parseInt(col/2)*50}px`;
        // div.style.top=`${parseInt(raw/2)*50}px`;
        div.style.left = `0px`;
        div.style.top = `0px`;
        div.className = 'BLOCK RIG';
        div.id = "move_block";
        div.style.transition = "all 1s";
        this.appendChild(div);
    }
    var init = function (raw, col) {
        var map = document.getElementById("map_table");
        createMap.apply(map, arguments);
        createMoveBlock.apply(map.firstElementChild.firstElementChild, arguments);
    }(10, 10);
    var handler = {
        _direction: "RIG",
        _x: 0,
        _y: 0,
        _isBoundary: (ele,x, y) => {
            if (x < 0 || x > parseInt(document.defaultView.getComputedStyle(ele.parentNode.parentNode, null).width)-parseInt(document.defaultView.getComputedStyle(ele, null).width)) {
                return false;
            }
            else if (y < 0 || y > parseInt(document.defaultView.getComputedStyle(ele.parentNode.parentNode.parentNode, null).height)-parseInt(document.defaultView.getComputedStyle(ele, null).height)) {
                return false;
            }
           
            // if (x < 0 || x > 450) {
            //     return false;
            // }
            // else if (y < 0 || y > 450) {
            //     return false;
            // }
            return true;
        },
        'GO': function (d) {
            this[`TRA ${this._direction}`](d);
        },
        'TRA LEF': function (d) {
            let that=this;
            if (this._isBoundary(that,this._x - 50 * d, this._y)) {
                
                this.style.left = `${this._x - 50 * d}px`;
                this._x = parseInt(this.style.left);
                log1('success');
            }
            else {
                log1("左边不够，我放弃这一步了");
            }
        },
        'TRA TOP': function (d) {
            let that=this;
            if (this._isBoundary(that,this._x, this._y - 50 * d)) {
                this.style.top = `${this._y - 50 * d}px`;
                this._y = parseInt(this.style.top);
                log1('success');
            }
            else {
                log1("上边不够，我放弃这一步了");
            }
        },
        'TRA RIG': function (d) {
            let that=this;
            if (this._isBoundary(that,this._x + 50 * d, this._y)) {
                console.log(this);
                this.style.left = `${this._x + 50 * d}px`;
                this._x = parseInt(this.style.left);
                log1('success');
            }
            else {
                log1("右边不够，我放弃这一步了");
            }

        },
        'TRA BOT': function (d) {
            let that=this;
            if (this._isBoundary(that,this._x, this._y + 50 * d)) {

                this.style.top = `${this._y + 50 * d}px`;
                this._y = parseInt(this.style.top);
                log1('success');
            }
            else {
                log1("下边不够，我放弃这一步了");
            }

        },
        'MOV LEF': function (d) {
            this._direction = "LEF";
            this.style.transform = "rotateZ(180deg)";
            this["TRA LEF"](d);
        },
        'MOV TOP': function (d) {
            this._direction = "TOP";
            this.style.transform = "rotateZ(-90deg)";
            this["TRA TOP"](d);
        },
        'MOV RIG': function (d) {
            this._direction = "RIG";
            this.style.transform = "rotateZ(0deg)";
            this["TRA RIG"](d);
        },
        'MOV BOT': function (d) {
            this._direction = "BOT";
            this.style.transform = "rotateZ(90deg)";
            this["TRA BOT"](d);
        }
    };
    var commandHandle = function (val) {
        var commandAry = val.split(/[\n]/);
        var commandList = [];
        for (let i = 0; i < commandAry.length; i++) {
            var commands = commandAry[i].split(/[\s]/);
            let step = 1;
            let command = commandAry[i];
            if (/^[0-9]$/.test(commands[commands.length - 1])) {
                step = parseInt(commands.pop());
                command = commandAry[i].slice(0, -2);
            }
            commandList.push({
                step: step,
                command: command
            });
        }
        return commandList;
    };
    var log1 = function (str) {
        var p = document.createElement('p');
        p.innerHTML = str;
        consoleDiv.appendChild(p);
    }

    var buttonList = document.getElementsByTagName('button');
    var moveBlock = document.getElementById("move_block");
    var commandStr = document.getElementById("command_list");
    var consoleDiv = document.getElementById("console_div");
    for (let i in handler) {
        move_block[i] = handler[i];
    }
    buttonList[0].addEventListener("click", function () {
        var commandList = commandHandle(commandStr.value);
        for (let i in commandList) {
            setTimeout(function (i) {
                return () => {
                    moveBlock[commandList[i].command](commandList[i].step);
                };
            }(i), 1000 * i);
        }
    });
})()