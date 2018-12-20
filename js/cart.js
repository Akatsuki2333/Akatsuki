window.onload = function () {
    hasChecked();
    allChecked();
    deleteFun();
}
// 单选函数
var hasChecked = function () {
    var checkBox = document.getElementsByClassName("shop_checkbox");
    console.log(checkBox.length);
    for (var i = 0; i < checkBox.length - 1; i++) {
        checkBox[i].onclick = function () {
            var hasChecked = this.getAttribute("checked");
            if (hasChecked === null) {
                this.setAttribute("checked", " ");
                // 这里一定要负值，即使是空格。
            } else {
                this.removeAttribute("checked");
            }
        }
    }
}

// 全选函数
var allChecked = function () {
    var checkBox = document.getElementsByClassName("shop_checkbox");
    var length = checkBox.length;
    console.log(length);

    checkBox[length - 1].onclick = function () {
        for (var i = 0; i < length; i++) {
            console.log(111);
            var hasChecked = this.getAttribute("checked");
            if (hasChecked === null) {
                checkBox[i].setAttribute("checked", " ");
                // 这里一定要负值，即使是空格。
            } else {
                checkBox[i].removeAttribute("checked");
            }
        }
    }
}

// 删除函数
var deleteFun = function () {
    var deleteBox = document.getElementsByClassName("del_box");
    var mask = document.getElementsByClassName("mask")[0];
    var maskBox = mask.getElementsByClassName("mask_box")[0];
    var btnCancel = document.getElementsByClassName("btn_cancel")[0];

    //console.log(33);
    for (var i = 0; i < deleteBox.length; i++) {
        //console.log(11);
        deleteBox[i].onclick = function () {
            mask.style.display = "block";
            maskBox.className = "mask_box jumpOut";

            // 开垃圾桶的盖子
            var delTop = this.getElementsByClassName("del_top")[0];
            delTop.style.transition = "all 1s ease";
            delTop.style.webkitTransition = "all 1s ease";
            delTop.style.transform = "translateY(-5px) rotate(-45deg)";
            delTop.style.webkitTransform = "translateY(-5px) rotate(-45deg)";

            // 关上垃圾桶的盖子,要写在遍历里面，否则有bug
            btnCancel.onclick = function () {
                mask.style.display = "none";
                delTop.style.transition = "all 1s ease";
                delTop.style.webkitTransition = "all 1s ease";
                delTop.style.transform = "translateY(0px) rotate(0deg)";
                delTop.style.webkitTransform = "translateY(0px) rotate(0deg)";

            }
        }
    }
}
