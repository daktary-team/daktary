window.addEventListener('hashchange', () => window.location.reload(true))
window.addEventListener('load', () => {
  const ghUrl = window.location.toString().split('#')[1] ||
    'multibao/contributions/tree/master/pages'
  router.go(ghUrl)
  if (router.isNoRoute()) {
    window.location = './404.html'
  }
})
const template = new Template()
const layout = new Layout()
