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