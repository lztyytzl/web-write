/**
 * @description 自定义Promise
 * @author 龙英杰
 */
class MyPromise{
    state = 'pending' // 状态 'pending' 'fulfilled' 'rejected'
    value = undefined // 成功的值
    reason = undefined // 失败后的值

    resolveCallbacks = []
    rejectCallbacks = []

    constructor(fn) {
        const resolveHandler = (value) => {
            if (this.state === 'pending') {
                this.state = 'fulfilled'
                this.value = value
                this.resolveCallbacks.forEach(fn => fn(this.value))
            }
        }

        const rejectHandler = (reason) => {
            if (this.state === 'pending') {
                this.state = 'rejected'
                this.reason = reason
                this.rejectCallbacks.forEach(fn => fn(this.reason))
            }
        }

        try {
            fn(resolveHandler, rejectHandler)
        } catch (error) {
            rejectHandler(error)
        }
    }

    then(fn1, fn2) {
        fn1 = typeof fn1 === 'function' ? fn1 : (v) => v
        fn2 = typeof fn2 === 'function' ? fn2 : (e) => e
        
        if (this.state === 'pending') {
            const p1 = new MyPromise((resolve, reject) => {
                this.resolveCallbacks.push(() => {
                    try {
                        const newValue = fn1(this.value)
                        resolve(newValue)
                    } catch (error) {
                        reject(error)
                    }
                })
                this.rejectCallbacks.push(() => {
                    try {
                        const newReason = fn2(this.value)
                        resolve(newReason)
                    } catch (error) {
                        reject(error)
                    }
                })
            })
            return p1
        }
        
        if (this.state === 'fulfilled') {
            return new MyPromise((resolve, reject) => {
                try {
                    const newValue = fn1(this.value)
                    resolve(newValue)
                } catch (error) {
                    reject(error)
                }
            })
        }
        
        if (this.state === 'rejected') {
            return new MyPromise((resolve, reject) => {
                try {
                    const newReason = fn2(this.value)
                    resolve(newReason)
                } catch (error) {
                    reject(error)
                }
            })
        }
    }

    catch(fn) {
        return this.then(null, fn)
    }
}

MyPromise.resolve = function (value) {
    return new MyPromise((resolve, reject) => resolve(value))
}

MyPromise.reject = function (reason) {
    return new MyPromise((resolve, reject) => reject(reason))
}

MyPromise.all = function (promiseList = []) {
    return new MyPromise((resolve, reject) => {
        const result = [] // 结果数组
        const length = promiseList.length
        let resolveCounter = 0
        promiseList.forEach(p => {
            p.then(data => {
                result.push(data)
                resolveCounter++
                if (resolveCounter === length) {
                    resolve(result)
                }
            }).catch((err) => {
                reject(err)
            })
        })
    })
}

MyPromise.race = function (promiseList = []) {
    return new MyPromise((resolve, reject) => {
      let resolved = false // 是否存在一个执行成功标记
      return new MyPromise((resolve, reject) => {
        promiseList.forEach(p => {
            p.then(data => {
                if (!resolved) {
                    resolve(data)
                    resolved = true
                }
            }).catch((err) => {
                reject(err);
            })
        })
      })  
    })
}

const p = new MyPromise((resolve, reject) => {
    resolve('ok')
})
console.log(p);