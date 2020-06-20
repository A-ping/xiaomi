//外部引入js文件，需要将函数书写为IIFE形式，防止变量污染
(function(){
    // 淡入淡出轮播图
        var $sWiper=$("#sWiper");
        var $slides=$("#sWiper ul li");
        var $leftBtn=$("#leftBtn");
        var $rightBtn=$("#rightBtn");
        var $circles=$("#circles a");
        var amount=$slides.length;

        // 信号量
        var idx=0;
        var timer=setInterval(rightb,2000)
        // 定时器,鼠标进入大盒子，关闭定时器
        $sWiper.mouseenter(function(){
            clearInterval(timer);
        })
        // 鼠标离开大盒子，开启定时器
        $sWiper.mouseleave(function(){
            // 设表先关
            clearInterval(timer);
            timer=setInterval(rightb,2000);
        })
        // 右按钮点击事件
        $rightBtn.click(rightb)
        function rightb(){
            // 防流氓,当图片不运动时执行下面语句，运动时return
            if($slides.is(":animated")){
                return;
            }
            // 旧图淡出,eq方法指定index上的那一个发生改变，fadeout淡出
            $slides.eq(idx).fadeOut(300,function(){
                idx++;
                if(idx>amount-1){
                    idx=0;
                }
                // 新图淡入，写在回调函数里，因为老图淡出，新图才能淡入，fadein淡入
                $slides.eq(idx).fadeIn(300);
                // 小圆点
                $circles.eq(idx).addClass("circles-a").siblings().removeClass("circles-a");
            })
        }
        // 左按钮点击事件
        $leftBtn.click(function(){
            if($slides.is(":animated")){
                return;
            }
            $slides.eq(idx).fadeOut(300,function(){
                idx--;
                if(idx<0){
                    idx=amount-1;
                }
                $slides.eq(idx).fadeIn(300);
                $circles.eq(idx).addClass("circles-a").siblings().removeClass("circles-a")
            })
        })
        // 小圆点事件
        $circles.click(function(){
            // 老图淡出
            $slides.eq(idx).stop(true).fadeOut(300);
            // idx改变
            idx=$(this).index();
            // 新图淡入
            $slides.eq(idx).stop(true).fadeIn(300);
            // 小圆点改变
            $circles.eq(idx).addClass("circles-a").siblings().removeClass("circles-a")
        })

        // 普通轮播图,在图片后面再加一张第一张图
        // var $sWiper_ul=$("#sWiper ul")
        // // 获取长度,5个li
        // var length=$slides.size();
        // // 获取宽度
        // var width=$sWiper.width();
        // // 定义信号量
        // var idx=0;
        // $rightBtn.click(function(){
        //     if($sWiper_ul.is(":animated")){
        //                 return;
        //     }
        //     // 信号量增加
        //     idx++;
        //     // 宽度增加一倍，这里的盒子是ul的盒子进行动画
        //     $sWiper_ul.animate({left:width*-idx},1000,function(){
        //         if(idx>=length-1){
        //             idx=0;
        //             // css可以直接闪回，不需要一张张闪回
        //             $sWiper_ul.css({left:0});
        //         }
        //     })
        // });
        // $leftBtn.click(function(){
        //     if($sWiper_ul.is(":animated")){
        //         return;
        //     }
        //     idx--;
        //     $sWiper_ul.animate({left:width*-idx},1000,function(){
        //         if(idx<=0){
        //             idx=length-1;
        //             $sWiper_ul.css({left:width*-idx})
        //         }
        //     })
        // })

        // 选项卡
        var $items=$("#nav_list .nav-item")
        // console.log($items)
        var $lists=$("#nav_list .nav-item .cont")
        $items.mouseenter(function(){
            // eq()方法将ul里面的li大排序，而在nay-item上面还有一个li，所以index方法后需要减一
            $lists.removeClass("cur").eq(($(this).index())-1).addClass("cur")
        });
        $items.mouseleave(function(){
            $lists.removeClass("cur")
        })

        // 倒计时
        var $spanH=$(".se-txt")[0];
        var $spanM=$(".se-txt")[1];
        var $spanS=$(".se-txt")[2];
        var $desc=$("#desc");
        // 获取盒子里面的内容使用方法html()
        // console.log($desc.html())
        var day2=new Date();
        day2.setHours(18);
        day2.setMinutes(0);
        day2.setSeconds(0);
        var day1=new Date();//获取当前时间戳
        // console.log(day2)
        if((day2-day1)>0){
            $desc.html("距离本场结束还剩")
            toTime();
            setInterval(toTime,1000);
        }
        else {
            $desc.html("本场已经结束")
            // console.log($desc)
        }
        function toTime(){
            var chaTime=Math.round((day2-day1)/1000);//获取倒计时秒数
            // console.log(chaTime)
            var iH=Math.floor(chaTime/3600);//秒转小时
            var iM=Math.floor(chaTime%3600/60);//秒转分钟
            var iS=chaTime%60;//余下的秒
            $spanH.innerHTML=iH;
            $spanM.innerHTML=iM;
            $spanS.innerHTML=iS;
        }

        // 返回顶部
        var $topblock=$("#topBlock");
        var $topa=$("#topBlock a")
        $(window).scroll(function(){
            if(window.pageYOffset>300){
                $topblock.css("display","block");
            }else{
                $topblock.css("display","none");
            }
        })
        console.log(window.pageYOffset)
        $topa.click(function(){
            $(window).scrollTop=0;
        })      
        
    }
)();