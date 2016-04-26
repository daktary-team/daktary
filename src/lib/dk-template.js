class Tpl {
  constructor(name) {
    this._htmlTpl = ''
    this._name = name
    this._events = {}
    this.data = () => {}
  }
  html(html) {
    const htmlTpl = document.createElement('template')
    htmlTpl.innerHTML = html
    this._htmlTpl = htmlTpl.content
    // we don't want to inherits of old events
    this._events = {}
  }
  _renderEvents(clone) {
    for (let event in this._events) {
      const [evtType, evtSelector] = event.split(' ')
      const func = this._events[event]
      clone.querySelector(evtSelector)
        .addEventListener(evtType, (evt) => func(evt))
    }
    return clone
  }
  _injectHtml() {
    const selector = `[data-template="${this._name}"]`
    const clone = document.importNode(this._htmlTpl, true)
    this._renderEvents(clone)
    document.querySelector(selector).innerHTML = ''
    document.querySelector(selector).appendChild(clone)
  }
  renderAsync() {
    this._injectHtml()
  }
  render() {
    this.data()
    if (this._htmlTpl) {
      this._injectHtml()
    }
  }
  events(events) {
    this._events = events
  }
}

class Template {
  create(name) {
    this[name] = new Tpl(name)
  }
}
