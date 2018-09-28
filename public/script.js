const playlistItems = document.querySelectorAll('.playlist-item')
const player = document.getElementById('player')
let previousItem = null

const playSong = function (fileName, ip) {
  player.setAttribute('controls', true)
  player.setAttribute('src', `http://${ip}/${fileName}`)
  player.setAttribute('preload', 'metadata')
  player.play()
}

playlistItems.forEach(item => {
  item.addEventListener('click', (e) => {
    if (previousItem) previousItem.classList.remove('playing')
    previousItem = item
    item.classList.add('playing')
    playSong(item.getAttribute('data-fileName'), item.getAttribute('data-serverIp'))
  })
})
