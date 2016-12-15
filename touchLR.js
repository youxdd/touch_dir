	function touClass(){
		// 公有方法
		this.touch = function(fn1,fn2){
			this.addEventListener('touchstart',function(event){
				var touch = event.targetTouches[0];
				// 开始坐标
				this.startx = touch.pageX;
				this.starty = touch.pageY;
			})
			this.addEventListener('touchmove',function(event){
				var touch = event.targetTouches[0];
				// 结束坐标
				this.endx = touch.pageX;
				this.endy = touch.pageY;
				var x = this.endx - this.startx;
				var y = this.endy - this.starty;
				var w = x<0?x*-1:x; //x轴的滑动值, w为x的绝对值
				var h = y<0?y*-1:y; //y轴的滑动值
				if(w>h){            //如果是在x轴中滑动,阻止默认事件
				   event.preventDefault(); // 解决微信touchmove冲突并实现上下可滑动
				}
			})
			this.addEventListener('touchend',function(event){
				if((this.startx - this.endx)>=100 && fn1){
					// 执行左滑回调
					fn1();
				}
				if((this.endx - this.startx)>=100 && fn2){
					// 执行右滑回调
					fn2();
				}
			})
		}
	}

// 调用
// touClass.call(obj);

// function left(){
// 	alert('左滑');
// }

// function right(){
// 	alert('右滑');
// }

// obj.touch(left,right);
// obj.touch(left);
// obj.touch('',right);

// 注册tap事件
function addTap(obj){
	var evt = document.createEvent('Event');
	evt.initEvent('tap', true, true);
	var startTime,endTime,startx,starty,endx,endy; 
	obj.addEventListener('touchstart',function(e){
		var touch = e.targetTouches[0];
		startx = touch.pageX;
		starty = touch.pageY;
		endx = startx;
		endy = starty;
		startTime = new Date() * 1;
	})
	obj.addEventListener('touchmove',function(e){
		var touch = e.targetTouches[0];
		endx = touch.pageX;
		endy = touch.pageY;
	})
	obj.addEventListener('touchend',function(e){
		e.preventDefault();
		endTime = new Date() * 1;
		var time = endTime - startTime;
		var x = endx - startx;
		var y = endy - starty;
		var W = x<0?x*-1:x; //x轴的滑动值, w为x的绝对值
		var H = y<0?y*-1:y; //y轴的滑动值
		// console.log(W + '  x');
		// console.log(H + '  y');
		if (W<5 && H<5) {
			this.dispatchEvent(evt);
		}
		
	})
}

function addTapno(obj){
	var evt = document.createEvent('Event');
	evt.initEvent('tap', true, true);
	var startTime,endTime; 
	obj.addEventListener('touchstart',function(){
		startTime = new Date() * 1;
	})
	obj.addEventListener('touchend',function(){
		endTime = new Date() * 1;
		var time = endTime - startTime;
		if (time < 80) {
			this.dispatchEvent(evt);
		}
	})
}


