/*
 * @Author: GuoWei
 * @Date: 2018-12-13 15:20:39
 * @LastEditors: GuoWei
 * @LastEditTime: 2019-01-23 16:12:00
 * @Description: 
 */

function addEvent(element, type, handler) {
    if (element.addEventListener) {
        element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
        element.attachEvent("on" + type, handler);
    } else {
        element["on" + type] = handler;
    }
}
(function () {
    var FloatLayer = function (ele) {
        this.ele = ele;
        this.maskEle = null;
        this.visible = false;
        this.init();
    }
    FloatLayer.prototype = {
        _createMaskEle: function () {
            this.maskEle = document.createElement('div');
            this.maskEle.style.width = window.screen.width + 'px';
            this.maskEle.style.height = window.screen.height + 'px';
            this.maskEle.style.backgroundColor = 'rgba(108,108,108,0.7)';
            this.maskEle.style.position = 'fixed';
            this.maskEle.style.left = '50%';
            this.maskEle.style.top = '50%';
            this.maskEle.style.transform = 'translate(-50%, -50%)';
            this.maskEle.style.visibility = this.visible ? 'visible' : 'hidden';
        },
        _createEle: function () {
            this.ele.style.position = 'absolute';
            this.ele.style.left = '50%';
            this.ele.style.top = '50%';
        },
        _setDragNode: function (node) {
            var _self = this;
            addEvent(node, 'mousedown', function (e) {
                var disX = e.clientX - _self.ele.offsetLeft;
                var disY = e.clientY - _self.ele.offsetTop;

                var move = function (e) {
                    _self.ele.style.left = e.clientX - disX + 'px';
                    _self.ele.style.top = e.clientY - disY + 'px';
                };
                addEvent(document, 'mousemove', move);
                addEvent(document, 'mouseup', function () {
                    document.removeEventListener('mousemove', move);
                });
            });
        },
        show: function () {
            //this.ele.style.transform = 'scale(1,1)';
            this.maskEle.style.visibility = 'visible';
            this.visible = true;
        },
        hide: function () {
            //this.ele.style.transform = 'scale(0,0)';
            this.maskEle.style.visibility = 'hidden';
        },
        init: function () {
            this._createMaskEle();
            this._createEle();
            this.ele.parentNode.removeChild(this.ele);
            this.maskEle.appendChild(this.ele);
            document.body.appendChild(this.maskEle);
            var self = this;
            addEvent(this.maskEle, 'click', function (e) {
                if (self.maskEle === this) {
                    self.hide();
                }
            });

            addEvent(this.ele, 'click', function (e) {
                e.stopPropagation();
            });
            this._setDragNode(this.ele);
        }

    };

    var layer = new FloatLayer(document.getElementById("float_box"));
    document.getElementById("sign_in").addEventListener("click", function () {
        layer.show();
    });
    addEvent(document.getElementById("close_btn"), "click", function () {
        layer.hide();
    })
})()

