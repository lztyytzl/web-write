// 重新定义数组原型
const oldArrayProperty = Array.prototype
// 创建新对象，原型指向 oldArrayProperty ，再扩展新的方法不会影响原型
const arrProto = Object.create(oldArrayProperty);
['push', 'pop', 'shift', 'unshift', 'splice'].forEach(methodName => {
    arrProto[methodName] = function () {
        updateView() // 触发视图更新
        oldArrayProperty[methodName].call(this, ...arguments)
    }
})

/**
 * 
 * @param {Object} target 
 */
function observer(target) {
    // 不是一个对象
    if (typeof target !== 'object' || target === null) {
        return target
    }
    // 数组
    if (Array.isArray(target)) {
        target.__proto__ = arrProto
    }
    for (let i in target) {
        defineReactive(target, i, target[i])
    }
}

// 监听对象改变
function defineReactive(target, key, value) {
    observer(value)
    let funcs = new Set()
    Object.defineProperty(target, key, {
        get() {
            // console.log('get', value);
            if (window.__func) {
                funcs.add(window.__func)
            }
            return value
        },
        set(newValue) {
            // console.log('set', newValue);
            if (newValue !== value) {
                observer(newValue)
            }
            value = newValue
            funcs.forEach((fn) => {
                fn()
            })
            updateView()
        }
    })
}

// 更新视图
function updateView() {
    
}

// 函数运行
function runFun(fn) {
    window.__func = fn
    fn()
    window.__func = null
}