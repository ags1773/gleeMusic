const playlistItems = document.querySelectorAll('.playlist-item')
const player = document.getElementById('player')
const searchBar = document.querySelector('input[type="text"]')
const url = 'http://127.0.0.1:3000' // server url
const searchURL = 'http://127.0.0.1:9200/metadata/my_type/_search' // elasticSearch url
let previousItem = null

document.addEventListener('DOMContentLoaded', () => {
  searchBar.value = ''
})

const playSong = function (fileName, ip) {
  player.setAttribute('controls', true)
  player.setAttribute('src', `${ip}/${fileName}`)
  player.setAttribute('preload', 'metadata')
  player.play()
}
const songClickAction = function (e) {
  if (previousItem) previousItem.classList.remove('playing')
  previousItem = this
  this.classList.add('playing')
  playSong(this.getAttribute('data-fileName'), url)
}

playlistItems.forEach(item => item.addEventListener('click', songClickAction.bind(item)))

searchBar.addEventListener('keyup', e => {
  if (e.target.value && e.target.value.length > 2) {
    fetch(searchURL + '?q=originalName:' + e.target.value)
      .then(res => res.json())
      .then(data => {
        clearPlaylist()
        populatePlaylist(data.hits.hits)
      })
      .catch(e => { throw e })
  }
})

function populatePlaylist (arr) {
  const playlist = document.querySelector('.playlist')
  arr.forEach(e => {
    const playlistItem = document.createElement('div')
    playlistItem.classList.add('playlist-item')
    playlistItem.classList.add('py-2')
    playlistItem.setAttribute('data-fileName', e._source.fileName)
    playlistItem.addEventListener('click', songClickAction.bind(playlistItem))
    playlistItem.innerHTML = e._source.originalName
    playlist.appendChild(playlistItem)
  })
}
function clearPlaylist () {
  const playlist = document.querySelector('.playlist')
  while (playlist.firstChild) {
    playlist.removeChild(playlist.firstChild)
  }
}
