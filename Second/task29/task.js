
(function () {
    var inputValue = document.getElementById("inputt");
    var test = document.getElementById("test");

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

    // var str="你好"; 
    // console.log(stringLength(str));

    function formTest() {
        var length = stringLength(inputValue.value);
        console.log(length);
        if (length < 4 || length > 16) {
            alert("请输入4-16个字符！");
            return false;
        }
        else {

            return true;
        }
    }

    test.addEventListener("click", formTest);

})()