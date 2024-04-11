/**
 * 深拷贝
 * @param {*} obj 
 * @returns 
 */
function deepClone(obj = {}) {
    if (typeof obj !== 'object' || obj == null) {
        return obj
    }
    let result
    if (obj instanceof Array) {
        result = []
    } else {
        result = {}
    }
    for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
            result[key] = deepClone(obj[key])
        }
    }
    return result
}

// 深拷贝实例
const obj1 = {
    name: '龙',
    ok: function() {
        console.log('你好');
    }
}

const obj2 = deepClone(obj1)
// const obj2 = JSON.parse(JSON.stringify(obj1));
obj2.name = '喻苏芳'
obj2.yes = function() {
    console.log('是的');
}
console.log(obj1);
console.log(obj2);