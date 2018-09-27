const playlistItems = document.querySelectorAll('.playlist-item')
const player = document.getElementById('player')

playlistItems.forEach(item => {
  item.addEventListener('mouseenter', (e) => {
    if (!item.classList.contains('test')) item.classList.add('test')
  })
  item.addEventListener('mouseleave', (e) => {
    if (item.classList.contains('test')) item.classList.remove('test')
  })
  item.addEventListener('click', (e) => {
    playSong(item.getAttribute('data-fileName'), item.getAttribute('data-serverIp'))
  })
})

function playSong (fileName, ip) {
  player.setAttribute('controls', true)
  player.setAttribute('src', `http://${ip}/${fileName}`)
  player.setAttribute('preload', 'metadata')
  player.play()
}
