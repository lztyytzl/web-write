// 节流 按照一定时间频率执行
function throttle(fn, delay = 500) {
    let timer = null
    return function() {
        if (timer) {
            return
        }
        timer = setTimeout(() => {
            fn.apply(this, arguments)
            timer = null
        }, delay)
    }
}

function throttle2(fn, delay = 500) {
    var args;
    var previous = 0;
    return function() {
        var now = +new Date();
        args = arguments;
        if (now - previous > delay) {
            fn.apply(this, args);
            previous = now;
        }
    }
}