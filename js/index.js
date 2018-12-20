window.onload = function () {
    search();
    Countdown();
    scrollPic();
}

// 滚动条滚动时头部通栏底色渐变函数
var search = function () {
    var search = document.getElementsByClassName("header_box")[0];
    var banner = document.getElementsByClassName("jd_banner")[0];
    var height = banner.offsetHeight;
    //console.log(height);
    window.onscroll = function () {
        //这里不是document.body.scrollTop
        var scrollTop = document.documentElement.scrollTop;
        //console.log(scrollTop);
        if (scrollTop < height) {
            var op = scrollTop / height;
            search.style.backgroundColor = "rgba(201, 21, 35, " + op + ")"
        } else {
            search.style.backgroundColor = "rgba(201, 21, 35, 0.85)"
        }
    }
};

// 设置倒计时函数
var Countdown = function () {
    var skTime = document.getElementsByClassName("secKill_time")[0];
    var timeList = skTime.getElementsByClassName("num");
    var time = 0.01 * 60 * 60;
    var timer = null;
    timer = setInterval(function () {
        time--;
        var h = Math.floor(time / (60 * 60));
        var m = Math.floor(time / 60 % 60);
        var s = time % 60;
        // console.log(h + "-" + m + "-" + s);
        timeList[0].innerHTML = h > 10 ? Math.floor(h / 10) : 0;
        timeList[1].innerHTML = h % 10;
        timeList[2].innerHTML = m > 10 ? Math.floor(m / 10) : 0;
        timeList[3].innerHTML = m % 10;
        timeList[4].innerHTML = s > 10 ? Math.floor(s / 10) : 0;
        timeList[5].innerHTML = s % 10;
        if (time <= 0) {
            clearInterval(timer);
        }
    }, 1000)
};

// 轮播图动画部分开始

var scrollPic = function () {
    var banner = document.getElementsByClassName("jd_banner")[0];
    var width = banner.offsetWidth;
//console.log(width);
// 轮播图的ul
    var imgBox = banner.getElementsByTagName("ul")[0];
// 小圆圈的ul
    var circleBox = banner.getElementsByTagName("ul")[1];
// 小圆圈的li数组
    var circleLis = circleBox.children;
    var addTransition = function () {
        imgBox.style.transition = "all .3s ease 0s";
        imgBox.style.webkitTransition = "all .3s ease 0s";
    };
    var removeTransition = function () {
        imgBox.style.transition = "none";
        imgBox.style.webkitTransition = "none";
    };
    var setTransform = function (t) {
        imgBox.style.transform = "translateX(" + t + "px)";
        imgBox.style.webkitTransform = "translateX(" + t + "px)";
    };

    var index = 1;  // 记录当前滑动到第几张图片
    var timer = null;

    clearInterval(timer);
    timer = setInterval(function () {
        index++;
        addTransition();
        setTransform(-index * width);
    }, 1000);
// 不可以直接在定时器里面写下面的代码，否则滚完第一轮之后第一张图片会突然蹦进来。

    imgBox.addEventListener("transitionEnd", function () {
        if (index >= 9) {
            index = 1;
        } else if (index <= 0) {
            index = 8;
        }
        // 加上removeTransition()是为了调到第一张或最后一张时不要有滑动效果，而是直接过去。
        removeTransition();
        setTransform(-index * width);
    }, false);
    //每次过渡完就判断一下是否已经走到第一张或者最后一张，是的话就清除过渡，然后再把整个box移动到index为1或者9的位置
    imgBox.addEventListener("webkitTransitionEnd", function () {
        if (index >= 9) {
            index = 1;
        } else if (index <= 0) {
            //显示没加前后两张图片时的最后一张，即第八张
            index = 8;
        }
        removeTransition();
        setTransform(-index * width);
    }, false);


// 手指滑动轮播图部分开始
    var startX = 0, endX = 0, moveX = 0;
    //触摸开始事件
    imgBox.addEventListener("touchstart", function (e) {
        //console.log(e);
        startX = e.touches[0].clientX;
        //console.log(startX)
    })
    // 触摸滑动事件
    imgBox.addEventListener("touchmove", function (e) {
        //console.log(e);
        //清除定时器
        clearInterval(timer);
        // 清除默认的滚动样式
        e.preventDefault();
        endX = e.touches[0].clientX;
        //console.log(endX)
        moveX = startX - endX;

        removeTransition();
        setTransform(-index * width - moveX);
    })
    // 触摸结束事件
    imgBox.addEventListener("touchend", function (e) {
        //console.log("end");
        // 如果移动的距离大于1/3，并且是移动过的
        if (Math.abs(moveX) > (1 / 3 * width) && endX != 0) {
            if (moveX > 0) {   //向左
                index++;
            } else {   //向右
                index--;
            }
            // 改变位置
            setTransform(-index * width);
        }
        // 回到原来的位置
        addTransition();
        setTransform(-index * width);

        startX = 0;
        endX = 0;

        clearInterval(timer);
        timer = setInterval(function () {
            index++;
            addTransition();
            setTransform(-index * width);
        }, 1000);
    })
}

//1,为什么要加removeTransition();
//2. 为什么要每次过渡完的时候
