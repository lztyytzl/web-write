const doms = {
    audioBox: document.querySelector('#myAudio'),
    lrcContainer: document.querySelector('.container'),
    lrcListBox: document.querySelector('.lrclist')
}
/**
 * 歌词数据处理
 * @param {String} lrc 音乐文本
 */
function createLRCData(lrc) {
    const lrcArr = lrc.split('\n')
    const result = []
    for (let i=0; i<lrcArr.length; i++) {
        const arrs = lrcArr[i].split(']')
        const _times = arrs[0].substring(1).split(':')
        const lrcObj = {
            time: +_times[0]*60 + +_times[1],
            words: arrs[1]
        }
        result.push(lrcObj)
    }
    return result
}
const lrcData = createLRCData(lrc);

// 创建歌词
function createDom() {
    const domFrag = document.createDocumentFragment()
    for(let i=0; i<lrcData.length; i++) {
        const lrcDom = document.createElement('li')
        lrcDom.textContent = lrcData[i].words
        domFrag.appendChild(lrcDom)
    }
    doms.lrcListBox.appendChild(domFrag)
}
createDom();
// 查找索引下标
function findIndex() {
    const curTime = doms.audioBox.currentTime
    for (let i = 0 ; i < lrcData.length; i++) {
        if (lrcData[i].time > curTime) {
            return i - 1
        }
    }
    return lrcData.length - 1
}

const containerHeight = doms.lrcContainer.clientHeight
// 最后一句歌词展示出来后，不再进行位移
const maxHeight = doms.lrcListBox.clientHeight - doms.lrcContainer.clientHeight
// 歌词移动,计算位移
function lrcPositionChange() {
    let index = findIndex()
    if (index < 0) {
        index = 0
    }
    const curLrc = doms.lrcListBox.children[index]
    let transY = +curLrc.offsetTop - +containerHeight/2 + +curLrc.clientHeight/2
    if (transY < 0) {
        transY = 0
    }
    if (transY > maxHeight) {
        transY = maxHeight
    }
    doms.lrcListBox.style.transform=`translateY(-${transY}px)`
    const cls = doms.lrcListBox.querySelector('.active')
    if (cls) {
        cls.classList.remove('active')
    }
    const li = doms.lrcListBox.children[index]
    if (li) {
        li.classList.add('active')
    }
}
lrcPositionChange()
doms.audioBox.addEventListener('timeupdate', lrcPositionChange)