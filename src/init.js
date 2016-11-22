const template = {}
const layout = {}

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
})

window.addEventListener('hashchange', () => {
  const githubUrl = window.location.toString().split('#')[1]
  const anchor = document.querySelector(`a[name="${githubUrl}"]`)
  document.querySelector('.search-engine').style.display = ''
  if (anchor) {
    anchor.scrollIntoView()
    window.location = `#${router.url}`
  } else {
    router.go(githubUrl)
  }
})
window.addEventListener('load', () => {
  const githubUrl = window.location.toString().split('#')[1]
  router.go(githubUrl)
  document.querySelector('#button-gh-search')
    .addEventListener('click', (evt) => {
      if (document.querySelector('#gh-search').value.length > 2) {
        const userQuery = document.querySelector('#gh-search').value
        const apiUrl = new GithubUrl(router.params).toGhApiSearch(userQuery)
        router.go(apiUrl.replace('https://api.github.com/', ''))
      }
    })
  document.querySelector('#gh-search').addEventListener('keypress', (evt) => {
    if (evt.key === 'Enter' && evt.target.value.length > 2) {
      const userQuery = evt.target.value
      const apiUrl = new GithubUrl(router.params).toGhApiSearch(userQuery)
      router.go(apiUrl.replace('https://api.github.com/', ''))
    }
  })
})
