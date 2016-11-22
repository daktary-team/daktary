// Create a router
const router = new Router()

router.route('/', function () {
  this.currentRoute = 'home'
  layout.home.render()
  document.querySelector('.search-engine').style.display = 'none'
})
router.route('search/code', function () {
  this.currentRoute = 'search'
  layout.searchList.render()
  document.querySelector('header').style.display = ''
})
router.route(':owner/:repo/blob/:branch/:path(.*)', function () {
  this.currentRoute = 'blob'
  layout.contribution.render()
  document.querySelector('header').style.display = 'none'
})
router.route(':owner/:repo/edit/:branch/:path(.*)', function () {
  this.currentRoute = 'edit'
  layout.editor.render()
  document.querySelector('header').style.display = 'none'
})
router.route(':owner/:repo/tree/:branch/:path(.*)?', function () {
  this.currentRoute = 'tree'
  layout.folders.render()
  document.querySelector('header').style.display = ''
})
router.route(':owner/:repo', function () {
  this.currentRoute = 'list'
  layout.folders.render()
  document.querySelector('header').style.display = ''
})
router.route(':owner', function () {
  this.currentRoute = 'repos'
  layout.repositories.render()
  document.querySelector('header').style.display = ''
})
