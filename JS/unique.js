// 传统方式去重
function uniqueOld(arr) {
    const newArr = []
    arr.forEach(element => {
        if (newArr.indexOf(element) < 0) {
            newArr.push(element)
        }
    })
    return newArr
}

// ES6 Set (无序)
function uniquePlus(arr) {
    const set = new Set(arr)
    return [...set]
}