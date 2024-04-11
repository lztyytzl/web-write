/**
 * 
 * @param {*} target 
 */
function reactive(target = {}) {
    if (typeof target !== 'object' || target == null) {
        return target
    }
    let funcs = new Set()
    const proxyHandler = {
        get: function(target, key, receiver) {
            // 只处理本身属性
            const ownKeys = Reflect.ownKeys(target)
            if (ownKeys.includes(key)) {
                console.log('get', key);
                // 启动监听
                if (window.__func) {
                    funcs.add(window.__func)
                }
            }
            const result = Reflect.get(target, key, receiver)
            // 深度监听
            return reactive(result)
        },
        set: function(target, key, val, receiver) {
            if (val === target[key]) {
                return true;
            }
            const ownKeys = Reflect.ownKeys(target)
            if (ownKeys.includes(key)) {
                // 更新key
                console.log('set', key, val);
            } else {
                // 新增key
                console.log('add', key, val);
            }
            funcs.forEach((fn) => {
                fn()
            })
            const result = Reflect.set(target, key, val, receiver)
            return result
        },
        deleteProperty: function(target, key) {
            const bool = Reflect.deleteProperty(target, key)
            // 是否删除成功了
            if (window.__func) {
                funcs.add(window.__func)
            }
            return bool
        }
    }
    const result = new Proxy(target, proxyHandler)
    return result
}

// 函数运行
function _run(fn) {
    window.__func = fn
    fn()
    window.__func = null
}