describe('#Router', () => {
  it('should return empty for a bad url', () => {
    const router = new Router()
    router.route(':owner/:repo/blob/:branch/:path(.*)', function () {
      this.currentRoute = 'BadBlob'
    })
    router.go('multibao/contributions/blob/contributions')
    expect(router.currentRoute).to.be('')
  }),
  it('should return blob for github blob url', () => {
    const router = new Router()
    router.route(':owner/:repo/blob/:branch/:path(.*)', function () {
      this.currentRoute = 'blob'
    })
    router.go('multibao/contributions/blob/master/contributions/test')
    expect(router.currentRoute).to.be('blob')
  }),
  it('should return tree for github tree url', () => {
    const router = new Router()
    router.route(':owner/:repo/tree/:branch/:path(.*)?', function () {
      this.currentRoute = 'tree'
    })
    router.go('multibao/contributions/tree/master/contributions')
    expect(router.currentRoute).to.be('tree')
  }),
  it('should return blob for github blob url', () => {
    const router = new Router()
    router.route(':owner/:repo/blob/:branch/:path(.*)', function () {
      this.currentRoute = 'blob'
    })
    router.go('multibao/contributions/blob/master/contributions/test')
    expect(router.currentRoute).to.be('blob')
  }),
  it('should return right path for github blob url', () => {
    const router = new Router()
    router.route(':owner/:repo/blob/:branch/:path(.*)', function () {
      this.currentRoute = 'blob'
    })
    router.go('che-mical/warp/blob/master/_posts/2014-coder-en-taule.markdown')
    expect(router.currentRoute).to.be('blob')
  }),
  it('should return tree for github tree url without path', () => {
    const router = new Router()
    router.route(':owner/:repo/tree/:branch/:path(.*)?', function () {
      this.currentRoute = 'tree'
    })
    router.go('multibao/contributions/tree/master')
    expect(router.currentRoute).to.be('tree')
  }),
  it('should return repo for github repo url', () => {
    const router = new Router()
    router.route(':owner/:repo', function () {
      this.currentRoute = 'repo'
    })
    router.go('multibao/contributions')
    expect(router.currentRoute).to.be('repo')
  }),
  it('should return empty for a bad github tree url', () => {
    const router = new Router()
    router.route(':owner/:repo/tree/:branch/:path(.*)?', function () {
      this.currentRoute = 'tree'
    })
    router.go('multibao/contributions/blob/master/contributions')
    expect(router.currentRoute).to.be('')
  })
  it('should store branch in params', () => {
    const router = new Router()
    router.route(':owner/:repo/tree/:branch/:path(.*)?', function () {
      this.currentRoute = 'tree'
    })
    router.go('multibao/contributions/tree/master/contributions')
    expect(router.params.branch).to.be('master')
  })
  it('should store multiple path in params', () => {
    const router = new Router()
    router.route(':owner/:repo/tree/:branch/:path(.*)?', function () {
      this.currentRoute = 'tree'
    })
    router.go('multibao/contributions/tree/master/contributions/page')
    expect(router.params.path).to.be('contributions/page')
  })
})
