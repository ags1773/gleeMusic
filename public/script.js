const playlistItems = document.querySelectorAll('.playlist-item')

playlistItems.forEach(item => {
  item.addEventListener('mouseenter', (e) => {
    if (!item.classList.contains('test')) item.classList.add('test')
  })
  item.addEventListener('mouseleave', (e) => {
    if (item.classList.contains('test')) item.classList.remove('test')
  })
  item.addEventListener('click', (e) => {
    playSong(item.getAttribute('data-fileName'))
  })
})

function playSong (fileName) {
  console.log('Play >>', fileName)
}
