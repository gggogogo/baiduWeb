// /*
//  * @Author: GuoWei
//  * @Date: 2018-11-14 09:37:51
//  * @LastEditors: GuoWei
//  * @LastEditTime: 2018-12-20 12:42:27
//  * @Description: 
//  */

"use strict"
const canvasBg = document.getElementById("canvasBg");
const canvasFg = document.getElementById("canvasFg");

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;
const INNER_RADIUS = 100;
const DIS = 50;
const TRACE_NUMBER = 4;

var imageShipArr = [];

const configShipArr = [{
    width: 30,
    height: 30,
    imageShipAddress: "img/min-iconfont-rocket-active.png"
},
{
    width: 30,
    height: 30,
    imageShipAddress: "img/min-iconfont-rocket-active.png"
},
{
    width: 30,
    height: 30,
    imageShipAddress: "img/min-iconfont-rocket-active.png"
},
{
    width: 30,
    height: 30,
    imageShipAddress: "img/min-iconfont-rocket-active.png"
}]

//兼容写法
const requestAnimationFrame = (function () {
    if (window.requestAnimationFrame) {
        return window.requestAnimationFrame;
    } else {
        return window.mozRequestAnimationFrame || window.webitRequestAnimationFrame;
    }
})();
//飞船类
function Ship(index) {
    this.oil = 10;
    this.startAngle = 0;
    this.index = index;
}

Ship.prototype = {
    _clearFG: function (context = canvasFg.getContext("2d")) {
        context.clearRect(0, 0, CANVAS_HEIGHT, CANVAS_WIDTH);
    },
    launch: function (context = canvasFg.getContext("2d"), angle) {
        this._clearFG();
        let config = configShipArr[this.index];
        if (!imageShipArr[this.index]) {
            let imageShip = new Image();
            imageShip.src = config.imageShipAddress;
            imageShipArr[this.index] = imageShip;
            imageShip.onload = function () {
                context.save();
                context.translate(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
                context.rotate(-angle);
                context.drawImage(imageShip, 50 * (2 + this.index) - config.width / 2, - config.height / 2, config.width, config.height);
                context.restore();
            }
        } else {
            context.save();
            context.translate(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
            context.rotate(-angle);
            context.drawImage(imageShipArr[this.index], 50 * (2 + this.index) - config.width / 2, - config.height / 2, config.width, config.height);
            context.restore();
        }
    },
    fly: function () {
        requestAnimationFrame(() => {
            this.startAngle += 0.05;
            this.launch(canvasFg.getContext("2d"), this.startAngle);
            requestAnimationFrame(arguments.callee.bind(this));
        })
    },
    stop: function () {

    },
    destory: function () {

    }
}

function drawOrbit(context = canvasBg.getContext("2d"), number = TRACE_NUMBER, dis = DIS, innerRadius = INNER_RADIUS) {
    for (let i = 0; i < number; i++) {
        context.save();
        context.beginPath();
        context.translate(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
        context.arc(0, 0, innerRadius + dis * (i), 0, Math.PI * 2, true);
        context.closePath();
        context.strokeStyle = "red";
        context.stroke();
        context.restore();
    }

}
(function drawBg(context = canvasBg.getContext("2d")) {
    let imagePlanet = new Image();
    imagePlanet.src = "img/min-iconfont-planet.png";
    imagePlanet.onload = function () {
        context.drawImage(imagePlanet, CANVAS_WIDTH / 2 - 25, CANVAS_HEIGHT / 2 - 25, 50, 50);
        drawOrbit();
    }

})();
// var ship_1 = new Ship(0);
let can = canvasFg.getContext("2d")

// ship_1.launch(0,can,0);
// ship_1.fly();
var ship_2 = new Ship(1);
ship_2.launch(can, 0);
ship_2.fly();



(function () {
    var PLAENT_RADIUS = 50;
    var ORBIT_DISTANCE = 50;

    //飞船相关配置
    const SHIPC_CONFIG = {
        smallSpaceship: {
            size: 30,
            SPACESHIP_SPEED: 0.05,
            DEFAULT_CHARGE_RATE: 10,
            imageShipAddress: "img/min-iconfont-rocket-active.png"
        },
    }

    //requestAnimationFrame兼容性写法
    const requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequesAnimationFrame;
    var Spaceship = function (id, spaceshipType) {
        this.id = id;
        this.power = 100;
        this.deg = 0;
        this.spaceshipType = spaceshipType;
        //********以下是自己没想到的***************** */
        this.curState = "stop";  //飞船初始状态            状态模式
        this.orbit = PLAENT_RADIUS * 2 + ORBIT_DISTANCE * this.id - this.spaceshipType.size / 2;
        //待理解
        this.mediator = null;
        this.timer = null;
    }
    //动力系统，控制飞创飞行，停止
    Spaceship.prototype.dynamicManager = function () {
        var _self = this;
        var fly = function () {
            _self.timer = setInterval(() => {
                _self.deg += this.spaceshipType.SPACESHIP_SPEED;
                if (_self.deg >= 360) {
                    _self.deg = 0;
                }
            }, 20);
        };
        var stop = function () {
            clearInterval(_self.timer);
        };
        return {
            fly,
            stop
        };
    };
    //飞船能源系统
    Spaceship.prototype.powerManager = function () {
        var _self = this;
        var charge = function () {
            chargeRate = SHIPC_CONFIG.smallSpaceship.DEFAULT_CHARGE_RATE;
            var timer = setInterval(() => {
                if (_self.curState == 'fly' || _self.curState == 'destroy') {
                    clearInterval(timer);
                    return false;
                };
                if (this.power >= 100) {
                    clearInterval(timer);
                    _self.power = 100;
                    return false;
                }
                _self.power += chargeRate;
                return true;
            }, 20);
        };
        var disCharge = function () { };
        return {
            charge,
            disCharge
        };
    };
    //状态系统
    Spaceship.prototype.stateManager = function () {
        var _self = this;
        var states = {
            fly: function () {
                _self.curState = 'fly';
                self.dynamicManager().fly();
                self.powerManager().disCharge();
            },
            stop: function () {
                _self.curState = 'stop';
                _self.dynamicManager().stop();
                _self.powerManager().charge();
            },
            destory: function () {
                _self.curState = 'destory';
                _self.mediator.remove(self);             //待理解
            }
        };
        var changeState = function () {
            states[state] && states[state]();
        };
        return {
            changeState
        };
    };
    //信息系统
    Spaceship.prototype.signalManager = function () {
        var _self = this;
        var receive = function (msg, from) {
            if (_self.curState != msg.cmd && _self.id == msg.id) {
                _self.stateManager().changeState(msg.cmd);
            }
        };
        return {
            receive
        };
    };

    /*指挥官，负责接收指令 */
    var Commander = function () {
        this.id = "Don";         //待理解
        this.cmds = [];
        this.mediator = null;
    };
    Commander.prototype.send = function (msg) {
        this.mediator.send(msg);
        this.cmds.push(msg);
    };

    /**中介者模式， 多对多=>一对多，解耦和*/
    var Mediator = function () {
        var spaceships = [];
        var commander = null;
        return {
            register: function (obj) {
                if (obj instanceof Commander) {
                    commander = obj;
                    obj.mediator = this;
                    return true;
                }
                else if (obj instanceof Spaceship) {
                    obj.mediator[obj.id] = obj;
                    obj.mediator = this;
                    return true;
                } else {
                    return false;
                }
            },
            send: function (msg, from, to) {
                var _self = this;
                setTimeout(() => {
                    var success = Math.random() > 0.3 ? true : false;
                    if (success) {
                        if (to) {        //单播模式
                            to.receive(msg);
                        } else {         //广播
                            if (msg.cmd == 'launch') {
                                _self.create(msg);
                            }
                            for (let key in spaceships) {
                                if (spaceships[key] != from) {
                                    spaceships[key].signalManager().receive(msg, from);
                                }
                            }
                        }
                        consoleUtil.show("send success");
                        return true;
                    }
                    else {
                        consoleUtil.show("send failed");
                        return false;
                    }
                }, 1000);
            },
            remove: function (obj) {
                if (obj instanceof Spaceship) {
                    consoleUtil.show("Destory spaceship No." + obj.id);
                    delete spaceships[obj.id];
                    return true;
                }
            },
            create: function (msg) {
                if (spaceships[msg.id] !== undefined) {
                    consoleUtil.show("Spaceship already exists");
                    return false;
                }
                var spaceship = new Spaceship(msg.id);
                this.register(spaceship);
                return true;
            },
            getSpaceships: function () {
                return spaceships;
            }

        }
    };

    var Message = function(target,command){
        this.id = target;
        this.cmd = null;
        switch(command){
            case'launch':
            case'stop':
            case'fly':
            case'destroy':
                this.cmd=command;
                break;
            default:
                alert("invalid command");
        }
    };
    /**控制台 显示工具 */
    var consoleUtil = (function () {
        var show = function () { };
        return {
            show
        }
    })()



})()