// 数组降维
function flat(arr) {
    const isDeep = arr.some(item => item instanceof Array)
    if (!isDeep) {
        return arr
    }
    const res = Array.prototype.concat.apply([], arr)
    return flat(res)
}
console.log(flat([12,34,[4,5,6],[4,8,9,[9,5,10]]]));