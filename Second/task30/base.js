/*
 * @Author: GuoWei
 * @Date: 2018-11-29 20:35:33
 * @LastEditors: GuoWei
 * @LastEditTime: 2018-11-29 20:53:19
 * @Description: 
 */


//策略对象
strategies = {
    //  判定字符串长度，中文为两个字符长度
    _stringLength:function (str) {
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
    },
    isNoEmpty: function (value, errMes) {
        if (value === '') {
            return errMes;
        }
    },
    Length: function (value, minLen, maxLen, errMes) {
        let valueLength = strategies._stringLength(value);
        if (valueLength < minLen || valueLength > maxLen) {
            return errMes;
        }
    },
    isEmail: function (value, errMes) {
        if (!/^([0-9a-zA-Z_\-\.])+\@([0-9a-zA-Z_\-\.])+\.[a-zA-Z]$/.test(value)) {
            return errMes;
        }
    },
    isMobile: function (value, errMes) {
        if (!/^1[3|5|7|8][0-9]{9}$/.test(value)) {
            return errMes;
        }
    },
    isNoSame: function (value1, value2, errMes) {
        if (!(value1 === value2)) {
            return errMes;
        }
    }
}

function addEventHandler(ele,type,handler){
    if(ele.addEventListener){
        ele.addEventListener(type,handler,false); 
    }
    else if(ele.attachEvent){
        ele.attachEvent("on"+type,handler);
    }
    else{
        ele["on"+type]=handler;
    }
}

