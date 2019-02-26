/*
 * @Author: GuoWei
 * @Date: 2018-11-27 19:46:38
 * @LastEditors: GuoWei
 * @LastEditTime: 2018-11-29 19:53:08
 * @Description: 
 */

(function () {
    const form = document.getElementById("form");
    var inputList = document.getElementsByTagName("input");
    var discribeList = document.getElementsByClassName("discribe");
    var hintList=document.getElementsByClassName("hint");
    var submit=document.getElementById("submit");
    const ruleStr = [
        { hint: "字符数为4~16位,中文符号长度为2", right: "名称格式正确", wrong: "格式输入有误" },
        { hint: "密码为4-16位英文字母，数字，英文符号。", right: "密码格式正确", wrong: "密码格式错误" },
        { hint: "请输入相同密码。", right: "密码格式正确", wrong: "两次密码不一致" },
        { hint: "xxx@xx.xx。", right: "邮箱格式正确", wrong: "邮箱格式错误" },
        { hint: "请输入11位手机号。", right: "号码格式正确", wrong: "号码格式错误" },
    ];

    const strages = {
        nameTest: function(){
            let length = stringLength(inputList[0].value);
            if (length < 4 || length > 16) {
                return false;
            }
            else {
                return true;
            }
        },

        passwordTest:function(){
            return (inputList[1].value.length > 3 && inputList[1].value.length <17);
        },

        passwordConfirm:function(){
            return !inputList[1].value == null && inputList[1].value == inputList[2].value;
        },
        
        emailTest:function(){
            return /^([0-9a-zA-Z_\-\.])+\@([0-9a-zA-Z_\-])+\.[a-z]$/.test(inputList[3].value);
        },
        
        phoneTest:function(){

        }
    }
    

    //输入验证函数
    function stringLength(str) {
        let len = 0;
        for (let i = 0; i < str.length; i++) {

            if (/[\u4e00-\u9fa5]/.test(str[i])) {
                len += 2;
            }
            else {
                len++;
            }
        }
        return len;
    }

    function nameTest() {
        let length = stringLength(inputList[0].value);
        console.log(length);
        if (length < 4 || length > 16) {
            return false;
        }
        else {

            return true;
        }
    }

    function passwordTest() {
        return (inputList[1].value.length > 3 && inputList[1].value.length <17);

    }

    function passwordConfirm() {
        return !inputList[1].value == null && inputList[1].value == inputList[2].value;
    }

    function emailTest() {
        return /^([0-9a-zA-Z_\-\.])+\@([0-9a-zA-Z_\-])+\.[a-z]$/.test(inputList[3].value);
    }
    
    function phoneTest() {
        return inputList[4].value.length == 11;
    }

    //输入框焦点函数
    function focusDisplay(i) {
        discribeList[i].innerHTML = ruleStr[i].hint;    
    }
    function blurDisplay(i) {
        let test;
        switch (i) {
            case 0:
                test = nameTest;
                break;
            case 1:
                test = passwordTest;
                break;
            case 2:
                test = passwordConfirm;
                break;
            case 3:
                test = emailTest;
                break;
            case 4:
                test = phoneTest;
                break;
        }

        if (test()) {
            discribeList[i].innerHTML = ruleStr[i].right;
            inputList[i].style.borderColor= "green";
        }
        else {
            discribeList[i].innerHTML = ruleStr[i].wrong;
            inputList[i].style.borderColor = "red";
        }
    }
    function submitForm() {
        if(nameTest()||passwordTest()||passwordConfirm()||emailTest()||phoneTest()){
            alert("yes");
        }
        
        else{
            alert("no");
        }
    }
 
    inputList[0].addEventListener("focus", function(){
        return focusDisplay(0);
    });
    inputList[0].addEventListener("blur",function(){
        return blurDisplay(0);
    });
    inputList[1].addEventListener("focus", function(){
        return focusDisplay(1);
    });
    inputList[1].addEventListener("blur", function(){
        return blurDisplay(1);
    });
    inputList[2].addEventListener("focus", function(){
        return focusDisplay(2);
    });
    inputList[2].addEventListener("blur", function(){
        return blurDisplay(2);
    });
    inputList[3].addEventListener("focus", function(){
        return focusDisplay(3);
    });
    inputList[3].addEventListener("blur", function(){
        return blurDisplay(3);
    });
    inputList[4].addEventListener("focus", function(){
        return focusDisplay(4);
    });
    inputList[4].addEventListener("blur", function(){
        return blurDisplay(4);
    });
    submit.addEventListener("click",submitForm);


    form.addEventListener("focus", function(event){
        let event = event || window.event;
        let target = event.target;
        if(target.tagName == "INPUT"){
            
        }

    });


})()



