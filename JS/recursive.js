function sum(x, y) {
    if (!x || !y) {
        console.log('x or y is not a number');
        return false;
    }
    if (y === x) {
       return x;
    }
    return sum(x, y - 1) + y;
}
console.log(sum(1, 100))