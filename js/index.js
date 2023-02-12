window.addEventListener('load', function() {
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');
    var focusWidth = focus.offsetWidth;
    focus.addEventListener('mouseenter', function() {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null;
    })
    focus.addEventListener('mouseleave', function() {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = setInterval(function() {
            // 手动调用点击事件
            arrow_r.click();
        }, 2000);
    })

    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    for (var i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li');
        li.setAttribute('index', i);
        ol.appendChild(li);
        li.addEventListener('click', function() {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'current';
            var index = this.getAttribute('index');
            num = index;
            circle = index;
            animate(ul, -index * focusWidth);
        })
    }
    ol.children[0].className = 'current';
    // 无缝滚动开始
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    // 无缝滚动结束
    var num = 0;


    var circle = 0; // 控制小圆圈的移动

    // 节流阀flag
    var flag = true;

    // 右侧按钮
    arrow_r.addEventListener('click', function() {
        if (flag) {
            flag = false; //关闭节流阀
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focusWidth, function() {
                flag = true; //通过回调函数打开节流阀,防止点击速度过快
            });
            circle++;
            if (circle == ol.children.length) {
                circle = 0;
            }
            circleChange();
        }
    });

    // 左侧按钮
    arrow_l.addEventListener('click', function() {
        if (flag) {
            flag = false;
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';

            }
            num--;
            animate(ul, -num * focusWidth, function() {
                flag = true;
            });
            circle--;
            if (circle < 0) {
                circle = ol.children.length - 1;
            }
            circleChange();
        }
    });

    //自定义函数
    function circleChange() {
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
    }

    // 自动轮播定时器
    var timer = setInterval(function() {
        // 手动调用点击事件
        arrow_r.click();
    }, 2000);



})

$(function() {
    var toolTop = $(".recommend").offset().top;
    toggleTool();

    // 节流阀
    var flag = true;

    function toggleTool() {
        if ($(document).scrollTop() >= toolTop) {
            $(".fixedtool").fadeIn();
        } else {
            $(".fixedtool").fadeOut();
        };
    }
    $(window).scroll(function() {
        toggleTool();
        //滚动页面时，电梯导航的div相应变化-------------------------------------------------------------------------------------------------------------------------3
        if (flag) {
            $(".floor .w").each(function(i, ele) {
                if ($(document).scrollTop() >= $(ele).offset().top) {
                    console.log(i);
                    $(".fixedtool li").eq(i).addClass("current").siblings().removeClass();
                }
            })
        }
    });

    // 点击电梯导航页面可以滚动到相应内容区域------------------------------------------------------------------------------------------------------------------------2
    $(".fixedtool li").click(function() {
        flag = false;
        console.log($(this).index());
        var current = $(".floor .w").eq($(this).index()).offset().top;
        $("body, html").stop().animate({
            scrollTop: current
        }, function() {
            flag = true;
        });

        $(this).addClass("current").siblings().removeClass();
    });

});