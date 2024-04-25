function add() {
    var args = Array.prototype.slice.call(arguments);
    console.log(args);
    function _adder() {
        args.push(...arguments);
        return _adder;
    }
    _adder.toString = function() {
        return args.reduce((a, b) => a + b);
    }
    return _adder;
}

function add(){
    // 拿到第一次调用的所有的参数
    var args = Array.prototype.slice.call(arguments);
    
    // 该函数会被返回，该函数的作用是继续收集参数
    function _adder(){
        args.push(...arguments);
        return _adder;
    }

    // 当调用 toString 方法的时候，说明我不要再接收参数了
    // 执行计算操作
    _adder.toString = function(){
        return args.reduce((a,b)=>a+b);
    }

    return _adder;
}

console.log(add(1, 3)(1)(4)(5, 6)(8).toString());
console.log(add(1, 2, 3, 4).toString());