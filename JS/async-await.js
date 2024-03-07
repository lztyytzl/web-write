// 同步语法的异步编程
// async function fn1() {
//     return 1
// }
// const res = fn1()
// console.log(res);

// 匿名函数
// !(async function(){
//     try {
//         // const data = await Promise.reject('warning')
//         // const data = await fn1()
//         const data = await 100
//         console.log(data);   
//     } catch (error) {
//         console.error(error);
//     }
// })()

// await后的内容看做callback
async function async1() {
    console.log(1);
}

async function async2() {
    async1()
    console.log(4);
    await async3('in')
}

async function async3() {
    const arg = arguments && arguments[0] ? arguments[0] : ''
    console.log(`${arg}7`)
    await console.log(`${arg}8`)
    await console.log(`${arg}5`)
    console.log(`${arg}9`)
}
// 同步执行,callback会在同步块执行顺序之后
async2()
async3()