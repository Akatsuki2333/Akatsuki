window.onload = function () {
    slideLeft();
};
var slideLeft = function () {
    var categoryLeft = document.getElementsByClassName("category_left")[0];
    var categoryAll = categoryLeft.getElementsByTagName("ul")[0];
    var categoryList = categoryAll.getElementsByTagName("li");
    var categoryRight = document.getElementsByClassName("category_right")[0];

    // 滑动部分开始
    // 1.transition和transform函数
    var addTransition = function () {
        categoryAll.style.transition = "all .3s ease 0s";
        categoryAll.style.webkitTransition = "all .3s ease 0s";
    };
    var removeTransition = function () {
        categoryAll.style.transition = "none";
        categoryAll.style.webkitTransition = "none";
    };
    var setTransform = function (t) {
        categoryAll.style.transform = "translateY(" + t + "px)";
        categoryAll.style.webkitTransform = "translateY(" + t + "px)";
    };

    // 2.得到滑动的数值
    var parentH = categoryLeft.offsetHeight - 45, childH = categoryAll.offsetHeight;
    console.log(parentH);  //812-45=767
    console.log(childH);  // 1200
    // currY是当前translateY的值，即ul里最上面的距离。与moveY是不一样的。
    // 设定时间是用来给下记做判断的，如果开始跟结束时间相差小于两百，那么可以等同于点击事件。
    var startY = 0, endY = 0, moveY = 0, currY = 0, maxY = 150, minY = -(childH - parentH + 150), startIime = 0, endTime = 0;
    //maxY = 150, minY = -( childH - parentH + 150);  //minY=-583
    categoryAll.addEventListener("touchstart", function (e) {
        //console.log(e);
        startY = e.touches[0].clientY;
        // 设定时间是用来给下记做判断的，如果开始跟结束时间相差小于两百，那么可以等同于点击事件。
        startIime = new Date().getTime();
    }, false);
    // touchmove里面的Y的值就是结束的值，而不是移动了多少
    categoryAll.addEventListener("touchmove", function (e) {
        //console.log(e);
        //move的时候一定要阻止默认的滑动事件，不然会一直滑动。
        e.preventDefault();
        endY = e.touches[0].clientY;
        //console.log(endY);
        //从开始到结束移动了多少距离
        moveY = startY - endY;  //若为正，即向上滑，currY为负。

        // 只允许在区间内滑动
        if ((currY - moveY) <= maxY && (currY - moveY) >= minY ){
            // 当滑动在此区间时，不需要过渡效果，直接滑倒用户滑的地方。
            removeTransition();
            setTransform(currY - moveY);
        }
    }, false);

    // 3.用滑动的数值来让ul动。
    categoryAll.addEventListener("touchend", function (e) {
        //滑动结束之后记录下当前的translateY的值,即距离顶部多少距离
        //(currY - moveY)用来判断滚动条时向上拉还是向下拉还是正常滑动三种情况。
        if ((currY - moveY) > 0) {
            currY = 0;
            addTransition();
            setTransform(currY);

        } else if ((currY - moveY) < (parentH - childH)) {
            currY = parentH - childH;
            addTransition();
            setTransform(currY);

        } else {
            currY = currY - moveY;
        }
        // 设定时间是用来给下记做判断的，如果开始跟结束时间相差小于两百，那么可以等同于点击事件。
        endTime = new Date().getTime();
        console.log(endTime - startIime);


        // 点击事件
        if (endTime - startIime < 200) {
            //移动端点击要用tab来代替click事件，即e.target.parentNode就是当前点击的li。
            var target = e.target.parentNode;  // 当前点击的li
            console.log(target);
            // 清除所有的li的类名样式
            for (var i = 0; i < categoryList.length; i++) {
                //console.log(categoryList.length);
                // 清除其他所有a的now属性
                categoryList[i].getElementsByTagName("a")[0].className = " ";
                categoryList[i].index = i; //这里得到的是相当于是index = i；
            }
            // 因为a的字体颜色是要独立设的，所以不能给li添加now属性。
            target.getElementsByTagName("a")[0].className = "now";
            // 得到index之后要得到当前所点击的li的索引号的话要这样写target.index
            console.log(target.index);
            var top = target.index * 50;
            if (top > childH - parentH) {
                addTransition();
                setTransform(-(childH - parentH));
                currY = -(childH - parentH);
            } else {
                addTransition();
                setTransform(-top);
                currY = -top;
            }
        }
    }, false)

}