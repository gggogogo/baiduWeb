(function () {
    // function isBodundary(ele) {
    //     switch (direction) {
    //         case "left":
    //             if (ele.parentNode.previousElementSibling == null) {
    //                 return true;
    //             }
    //             else {
    //                 return false;
    //             }
    //             break;
    //         case "right":
    //             if (ele.parentNode.nextElementSibling == null) {
    //                 return true;
    //             }
    //             else {
    //                 return false;
    //             }
    //             break;
    //         case "top":
    //             if (ele.parentNode.parentNode.previousElementSibling == null) {
    //                 return true;
    //             }
    //             else {
    //                 return false;
    //             }
    //             break;
    //         case "bottom":
    //             if (ele.parentNode.parentNode.nextElementSibling == null) {
    //                 return true;
    //             }
    //             else {
    //                 return false;
    //             }
    //             break;
    //     }
    // }
    function move(ele, direction) {
        switch (direction) {
            case "left":
                if (ele.style.left == "0px") {
                    console.log("到边界了");
                }
                else {
                    
                    ele.style.left = `${parseInt(ele.style.left) - 50}px`;
                }

                break;
            case "right":

                if (ele.style.left == `${parseInt(document.defaultView.getComputedStyle(ele.parentNode.parentNode,null).width)-parseInt(document.defaultView.getComputedStyle(ele,null).width)}px`) {
                    console.log("到边界了");
                }
                else {
                    ele.style.left = `${parseInt(ele.style.left) + 50}px`;
                }

                break;
            case "top":
                if (ele.style.top == "0px") {

                    console.log("到边界了");
                }
                else {
                    ele.style.top = `${parseInt(ele.style.top) - 50}px`;
                }

                break;
            case "bottom":
                if (ele.style.top == `${parseInt(document.defaultView.getComputedStyle(ele.parentNode.parentNode.parentNode,null).height)-parseInt(document.defaultView.getComputedStyle(ele,null).height)}px`) {
                    console.log(document.defaultView.getComputedStyle(ele,null).height);
                    console.log("到边界了");
                }
                else {
                    ele.style.top = `${parseInt(ele.style.top) + 50}px`;
                }

                break;
        }
    }
    function go(direction) {
        var block = document.getElementById("move_block");
        move(block, direction);
    }
    function changeDirection(_direction) {
        var block = document.getElementById("move_block");
        switch (_direction) {
            case "left":
                block.style.transform = "rotateZ(-90deg)";
                break;
            case "right":
                block.style.transform = "rotateZ(90deg)";
                break;
            case "top":
                block.style.transform = "rotateZ(0deg)";
                break;
            case "bottom":
                block.style.transform = "rotateZ(180deg)";
                break;
        }
    }
    window.onload = function () {

        document.getElementById("tra").addEventListener("click", function (e) {
            go(e.target.className);
            // changeDirection(e.target.id);
        })
        document.getElementById("move").addEventListener("click", function (e) {
            changeDirection(e.target.className);
            go(e.target.className);
        })
    }
})()

// (function () {

//     function move( direction, changeDirection) {
//         var ele=document.getElementById("move_block");
//         switch (direction) {
//             case "left":
//                 if (ele.style.left == "0px") {
//                     console.log("到边界了");
//                 }
//                 else {
//                     if (changeDirection) {
//                         ele.style.transform = "rotateZ(-90deg) translate(0,50px)";
//                     }
//                     else {
//                         ele.style.transform = "translate(-50px,0)"
//                     }
//                 }
//                 break;
//             case "right":

//                 if (ele.style.left == `${parseInt(document.defaultView.getComputedStyle(ele.parentNode.parentNode, null).width) - parseInt(document.defaultView.getComputedStyle(ele, null).width)}px`) {
//                     console.log("到边界了");
//                 }
//                 else {
//                     if (changeDirection) {
//                         ele.style.transform = "rotateZ(90deg) translate(0,50px)";
//                     }
//                     else {
//                         ele.style.transform = "translate(50px,0)"
//                     }
//                 }

//                 break;
//             case "top":
//                 if (ele.style.top == "0px") {

//                     console.log("到边界了");
//                 }
//                 else {
//                     if (changeDirection) {
//                         ele.style.transform = "rotateZ(0deg) translate(0,50px)";
//                     }
//                     else {
//                         ele.style.transform = "translate(0,50px)"
//                     }
//                 }

//                 break;
//             case "bottom":
//                 if (ele.style.top == `${parseInt(document.defaultView.getComputedStyle(ele.parentNode.parentNode.parentNode, null).height) - parseInt(document.defaultView.getComputedStyle(ele, null).height)}px`) {
//                     console.log(document.defaultView.getComputedStyle(ele, null).height);
//                     console.log("到边界了");
//                 }
//                 else {
//                     if (changeDirection) {
//                         ele.style.transform = "rotateZ(180deg) translate(0,50px)";
//                     }
//                     else {
//                         ele.style.transform = "translate(0,-50px)"
//                     }
//                 }

//                 break;
//         }
//     }
//     window.onload = function () {
//         document.getElementById("tra").addEventListener("click", function (e) {
//             move(e.target.className,false);
//             // changeDirection(e.target.id);
//         })
//         document.getElementById("move").addEventListener("click", function (e) {
//             move(e.target.className,true);
//         })
//     }
// })()