/*
 * @Author: GuoWei
 * @Date: 2018-12-03 19:09:30
 * @LastEditors: GuoWei
 * @LastEditTime: 2018-12-03 20:56:41
 * @Description: 
 */


(function () {
    var direction = "top";
    function isBodundary(ele) {
        switch (direction) {
            case "left":
                if (ele.parentNode.previousElementSibling == null) {
                    return true;
                }
                else {
                    return false;
                }
                break;
            case "right":
                if (ele.parentNode.nextElementSibling == null) {
                    return true;
                }
                else {
                    return false;
                }
                break;
            case "top":
                if (ele.parentNode.parentNode.previousElementSibling == null) {
                    return true;
                }
                else {
                    return false;
                }
                break;
            case "bottom":
                if (ele.parentNode.parentNode.nextElementSibling == null) {
                    return true;
                }
                else {
                    return false;
                }
                break;
        }
    }
    function move(ele, direction) {
        switch (direction) {
            case "left":
                ele.className = "";
                console.log(ele.previousSibling);
                console.log(ele.previousElementSibling);
                ele.parentNode.previousElementSibling.innerHTML = `<div class="move_block ${direction}"> </div>`;
                break;
            case "right":
                ele.className = "";
                ele.parentNode.nextElementSibling.innerHTML = `<div class="move_block ${direction}"> </div>`;
                break;
            case "top":
                ele.className = "";
                ele.parentNode.parentNode.previousElementSibling.cells[ele.parentNode.cellIndex].innerHTML = `<div class="move_block ${direction}"> </div>`;
                break;
            case "bottom":
                ele.className = "";
                ele.parentNode.parentNode.nextElementSibling.cells[ele.parentNode.cellIndex].innerHTML = `<div class="move_block ${direction}"> </div>`;
                break;
        }

    }
    function go() {
        var block = document.getElementsByClassName("move_block")[0];
        if (isBodundary(block)) {
            console.log("到边界了，走不动了");
        }
        else {
            move(block, direction);
        }
    }
    function changeDirection(_direction) {
        var block = document.getElementsByClassName("move_block")[0];
        direction = _direction;
        block.className = `move_block ${direction}`;
    }
    window.onload = function () {
        document.getElementById("go").onclick = go;
        document.getElementById("direction_button").addEventListener("click", function (e) {
            changeDirection(e.target.id);
        })
    }
})()