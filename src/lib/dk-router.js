/**
   * A Router to manage client side url.
   *
   * @param {String} An HTML string reprsenting an arguments
   * and queries option Url.
   *
   */
class Router {
  constructor() {
    this.url =  ''
    this.currentRoute = ''
    this.injectLayout = () => {}
    this._routes = []
    this.params = {}
    this.queries = {}
    if (this._isOffLine()) {
      this._go503()
    }
  }
  _isOffLine() {
    return ! navigator.onLine
  }
  _go503() {
    window.location = './503.html'
  }
  go404() {
    window.location = './404.html'
  }
  _urlWithoutParams() {
    return this.url.split('?')[0]
  }
  _resetRoute() {
    this.currentRoute = ''
    this.layout = ''
    this.params = {}
    this.queries = {}
  }
  _setQueryParameters() {
    const queries = this.url.split('?')[1]
    if (queries) {
      queries.split('&').map(query => {
        this.queries[query.split('=')[0]] = query.split('=')[1]
      })
    }
  }
  _setParams(pattern) {
    const patternItems = pattern.split('/')
    const urlValues = this._urlWithoutParams().split('/')
    for (let index in patternItems) {
      // Store all remain values
      const patternItem = patternItems[index]
      if (! patternItem.startsWith(':')) {
        continue
      }
      const paramName = patternItem.match(/^:(\w+)/)[1]
      if (patternItem.indexOf('(.*)') !== -1) {
        this.params[paramName] = urlValues.slice(index).join('/')
      // Store single value
      } else {
        this.params[paramName] = urlValues[index]
      }
    }
  }
  _patternToRegex(pattern) {
    const regex = ['^']
    pattern.split('/').map(patternItem => {
      // Capture a parameter
      if (patternItem.startsWith(':')) {
        let regTmp = '[0-9A-Za-z\u00C0-\u017F\-\_\.]*'
        // Capture all the parameters
        if (patternItem.endsWith('(.*)')) {
          regTmp = '[0-9A-Za-z\u00C0-\u017F\-\_\.\/]*'
        }
        // Capture optional parameters
        if (patternItem.endsWith('?')) {
          regex.pop()
          regTmp = '(\/[0-9A-Za-z\u00C0-\u017F\-\_\.\/]*|)'
        }
        regex.push(regTmp)
      } else {
        // Capture a fixed parameter
        regex.push(patternItem)
      }
      regex.push('\/')
    })
    regex.pop()
    regex.push('$')
    return regex.join('')
  }
  _checkPatternWithUrl(pattern) {
    return !! this._urlWithoutParams().match(this._patternToRegex(pattern))
  }
  _findAndSetCurrentRoute() {
    let route = {}
    for (let index in this._routes) {
      route = this._routes[index]
      if (this._checkPatternWithUrl(route.pattern)) {
        // Execute the action attach on a route
        this._setParams(route.pattern)
        this._setQueryParameters()
        ;(route.action.bind(this))()
        break
      }
    }
    return route
  }
  isNoRoute() {
    return ! this.currentRoute
  }
  go(url) {
    this._resetRoute()
    this.url = url || '/'
    this._findAndSetCurrentRoute()
    if (this.isNoRoute()) {
      this.go404()
    } else {
      this.injectLayout()
    }
  }
  route(pattern, action) {
    this._routes.push({
      pattern: pattern,
      action: action
    })
  }
}
