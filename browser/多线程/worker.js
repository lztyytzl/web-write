onmessage = function(e) {
    console.time('start');
    let startTime = performance.now();
    let delay = e.data.delay;
    let i = 0;
    const timer = setInterval(() => {
        i++;
        if (i === 10) {
            console.log(new Date())
            clearInterval(timer);
        }
    }, 1000);
    function tick() {
        let currentTime = performance.now();
        if (parseInt(currentTime) > 10000 && parseInt(currentTime) < 11000) {
            console.log(new Date());
            postMessage({ tick: performance.now() }); // 定时器实现
        }
        if (currentTime - startTime >= delay) {
            startTime = currentTime;
        }
        requestAnimationFrame(tick); // 使用requestAnimationFrame以尽可能高的精度循环
    }
    tick()
}