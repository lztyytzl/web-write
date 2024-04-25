/**
 * 防抖函数，用于限制函数的执行频率
 *
 * @param fn 需要防抖的函数
 * @param delay 延迟时间，默认为500毫秒
 * @returns 返回一个新的函数，该函数在被连续调用时，只会在最后一次调用后等待delay时间再执行
 */
function debounce(fn, delay = 500) {
    let timer = null
    return function() {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn.apply(this, arguments)
            timer = null
        }, delay)
    }
}