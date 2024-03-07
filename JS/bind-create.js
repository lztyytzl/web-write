// 自定义bind方法
Function.prototype.myBind = function() {
    // 将参数拆解为数组
    const args = Array.prototype.slice.call(arguments)
    // 获取第一项
    const f = args.shift()
    // 获取this
    const self = this
    return function() {
        return self.apply(f, args)
    }
}

function fn1(a, b, c) {
    console.log('this', this);
    console.log(a, b, c);
    return 'bind'
}
const fn2 = fn1.myBind({a: 1}, 1, 2, 3)
const res = fn2()
console.log(res);
