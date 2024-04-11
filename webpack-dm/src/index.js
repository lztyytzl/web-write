import { doms, createLRCData, createDom, lrcPositionChange, removeAudio } from './static/audio.js';
var isReset = false
window.onload = function() {
    const btnDom = document.querySelector('#btn')
    btnDom.addEventListener('click', () => {
        isReset = removeAudio()
        loadMusic()
    })
}
// 加载歌曲
function loadMusic() {
    fetch('https://api.uomg.com/api/rand.music?sort=抖音榜&format=json').then(response => {
        return response.json()
    }).then(res => {
        const url = res.data.url
        console.log(url);
        const tDom = document.querySelector(".title")
        tDom.textContent = res.data.name +'--'+ res.data.artistsname
        doms.audioBox.src = url
        const mid = url.split('=')[1]
        loadLyric(mid)
    })
}
loadMusic()
// 加载歌词
function loadLyric(mid) {
    if (mid) {
        fetch(`api/api/song/lyric?id=${mid}&lv=1&kv=1&tv=-1`, {
            mode: 'cors'
        }).then(response => {
            return response.json()
        }).then(res => {
            if (res.code === 200) {
                const lrcDataStr = res.lrc.lyric
                console.log(lrcDataStr);
                const lrcData = createLRCData(res.lrc.lyric.substring(-2))
                console.log(lrcData);
                createDom()
                isReset = false
                doms.audioBox.addEventListener('timeupdate', function() {
                    if (!isReset) {
                        lrcPositionChange()
                    }
                })
            } else {

            }
            console.log(res);
        })
    } else {
        throw new Error('当前歌曲没有歌词!')
    }
}
// 监听时间
doms.audioBox.addEventListener('error', (e) => {
    alert('当前歌曲加载错误!')
    removeAudio()
    const flagHtml = document.createElement('li')
    flagHtml.textContent = '歌曲失踪了！'
    doms.lrcListBox.appendChild(flagHtml)
})