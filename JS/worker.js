onmessage = function(e) {
    console.time('start');
    let startTime = performance.now();
    let delay = e.data.delay;
    let i = 0;
    setInterval(() => {
        i++;
        if (i === 60) {
            console.log(new Date())
        }
    }, 1000);
    function tick() {
        let currentTime = performance.now();
        if (parseInt(currentTime) > 60000 && parseInt(currentTime) < 61000) {
            console.log(new Date());
        }
        if (currentTime - startTime >= delay) {
            startTime = currentTime;
            postMessage({ tick: performance.now() }); // 发送定时器触发消息
        }
        requestAnimationFrame(tick); // 使用requestAnimationFrame以尽可能高的精度循环
    }
    tick()
}