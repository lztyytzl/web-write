const proxy = new Proxy(console.warn, {
    apply(target, thisArg, argumentsList) {
        if (argumentsList.length) {
            const arg = argumentsList[0]
            if (arg % 2) {
                // console.log('打印的是奇数');
                return null
            }
            return target(...argumentsList)
        }
        return target(...argumentsList)
    }
})
console.warn = proxy;
setTimeout(() => {
    console.warn(6)
    console.warn('129')
    console.warn('125')
}, 0)