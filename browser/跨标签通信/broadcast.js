const msgInp = document.querySelector("#msg");
const btn = document.querySelector("#btn");

// 创建广播
const broadCaseChannel = new BroadcastChannel("channel");
btn.addEventListener("click", () => {
  const msg = msgInp.value;
  broadCaseChannel.postMessage({
    msg
  });
});
// 关闭广播
window.onbeforeunload = (e) =>{
    broadCaseChannel.close();
}