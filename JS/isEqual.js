// 是否为Object
function isObject(obj) {
    return typeof obj === 'object' && obj !== null
}
// 判断是否全相等
function isEqual(obj1, obj2) {
    // 不是对象的情况下
    if (!isObject(obj1) || !isObject(obj2)) {
        return obj1 === obj2
    }
    // 是否是同一个obj
    if (obj1 === obj2) {
        return true
    }
    const obj1Keys = Object.keys(obj1)
    const obj2Keys = Object.keys(obj2)
    if (obj1Keys.length !== obj2Keys.length) {
        return false
    }
    for (const key in obj1) {
        // 递归比较
        const res = isEqual(obj1[key], obj2[key])
        if (!res) {
            return false
        }
    }
    // 全相同
    return true
}