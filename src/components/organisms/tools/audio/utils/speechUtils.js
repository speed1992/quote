import { scrollToMemorizedRow } from '../../../../../common/utils/utils'

export async function play(index, currentData, voiceSpeed, listRef, scrollPosition, setScrollPosition) {
    var synth = window.speechSynthesis,
        isSpeaking = synth.speaking

    let cancel = () => {}
    cancel()

    let p = new Promise((resolve) => (cancel = resolve))

    if (!isSpeaking)
        for (let i = index; i < currentData.length; i++) {
            setScrollPosition(i)
            scrollToMemorizedRow(listRef, i, currentData)
            await Promise.race([p, getNextAudio(currentData[i]['quote'], voiceSpeed)])
        }
}

function getNextAudio(message, voiceSpeed) {
    let audio = new SpeechSynthesisUtterance(message)
    audio.rate = voiceSpeed
    window.speechSynthesis.speak(audio)
    return new Promise((resolve, reject) => (audio.onend = resolve))
}
