/*
 * @Author: GuoWei
 * @Date: 2018-11-12 15:11:19
 * @LastEditors: GuoWei
 * @LastEditTime: 2018-11-13 21:35:12
 * @Description: 
 */


// function Node(data){
//     this.data=data;
//     //this.parent=null;
//     this.left=null;
//     this.right=null;
// }

// function Tree(data){
//     var node=new Node(data);
//     this._root=node;
// }
// Node.prototype={
//     addLeft:function(leftChild){
//         this.left=leftChild;
//     },
//     addRight:function(rightChild){
//         this.right=rightChild;
//     },
//     delLeft:function(){
//         this.left=null;
//     },
//     delRight:function(){
//         this.right=null;
//     },
//     dealwith:function(){
//         console.log(this.data);
//     },
//     preorderTraversal:function(root){
//         if(root!=null){
//             root.dealwith();
//             preorderTraversal(root.left);
//             preorderTraversal(root.right);   
//         }
//     },
//     inorderTraversal:function(root){
//         if(root!=null){
//             inorderTraversal(root.left);
//             root.dealwith();
//             inorderTraversal(root.right);
//         }
//     },
//     postorderTraversal:function(root){
//         if(root!=null){
//             inorderTraversal(root.left);
//             inorderTraversal(root.right);
//             root.dealwith();
//         }
//     },
//     sequenceTraversal:function(root){
//         if(root==null){
//             return false;
//         }
//         var queue=[];
//         while(root!=null){
//             queue.push(root.data);
//         }
//     }
// }
var divList = new Array();
function changeColor() {
    var index = 1;
    for (let i in divList) {
        index++
        setTimeout(function (i) {
            return () => {
                showIsChange(divList, i);
            }
        }(i), 500 * index);
    }
    setTimeout(function(){
        showIsChange(divList, divList.length);
    },500*(index+1));
}
function reset() {
    divList = [];
}

function showIsChange(divList, index) {
    // console.log(divList);
    divList.forEach((ele, idx) => {
        if (idx == index) {
            ele.className = ele.className.replace("noChange", "isChange");
            console.log(ele.className);
        } else {
            if (ele.className.indexOf("noChange") > 0) {
                return;
            }
            ele.className = ele.className.replace("isChange", "noChange");
        }
    });
}

function preorderTraversal(root) {
    if (root) {
        divList.push(root);
        preorderTraversal(root.firstElementChild);
        preorderTraversal(root.lastElementChild);
    }
}
var c1 = document.getElementsByClassName("c1")[0];
var buttonList = document.getElementsByTagName("button");

window.onload = function () {
    
    buttonList[0].onclick = function () {
        reset();
        preorderTraversal(c1);
        changeColor();
    }
}