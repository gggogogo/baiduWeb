var formValid = document.getElementById("form_valid");

addEventHandler(formValid, "blur", function (event) {
    let target = event.target;

    if (target.tagName == "INPUT") {
        var mes = '';
        let strategyList = target.getAttribute("strategies").split(/[^a-zA-Z0-9\u4e00-\u9fa5]+/);
        console.log(strategies);
        for (let i = 0; i < strategyList.length; i++) {
            switch (strategyList[i]) {
                case "isNoEmpty":
                    mes = strategies.isNoEmpty(target.value, "输入不能为空");
                    break;
                case "Length":
                    mes = strategies.Length(target.value,4,16, "长度在4-16");
                    break;
                case "isEmail":
                    mes = strategies.isEmail(target.value, "邮箱地址不正确");
                    break;
                case "isMobile":
                    mes = strategies.isMobile(target.value, "手机号格式不正确");
                    break;
                case "isNoSame":
                    mes = strategies.isNoSame(target.value,target.previousElementSibling.value, "两次密码不一致");
                    break;
            }

            if (mes) {
                target.nextElementSibling.innerHTML = mes;
                target.style.borderColor="red";
                break;
            }
        }
        if (mes == "") {
            target.style.borderColor="green";
            target.nextElementSibling.innerHTML = "输入正确";
        }

    }
})
addEventHandler(formValid, "click", function (event){
    let target = event.target;

    if (target.tagName == "INPUT") {
       target.nextElementSibling.style.display="block";
    }
})