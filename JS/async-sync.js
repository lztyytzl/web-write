// 同步、异步任务
// console.log(1);
// setTimeout(() => {
//     console.log(2);
// }, 1000)
// console.log(3);
// setTimeout(() => {
//     console.log(4);
// }, 0)
// console.log(5);

// 宏任务、微任务,
// console.log('1');
// setTimeout(() => {
//     console.log(4);
//     new Promise((resolve) => {
//         setTimeout(() => {
//             console.log('2.2');
//         }, 0)
//         console.log('1.1');
//         resolve()
//     }).then(() => {
//         console.log('2');
//     }).then(()=>{
//         console.log('2.1')
//     })
// }, 10);
// setTimeout(() => {
//     console.log('3')
// }, 10)
