class Lyt {
  constructor() {
    this._htmlTpl = ''
  }
  _getTemplateNames() {
    return Array.from(this._htmlTpl.querySelectorAll('[data-template]'))
      .map(div => div.getAttribute('data-template'))
  }
  html(html) {
    const htmlTpl = document.createElement('template')
    htmlTpl.innerHTML = html
    this._htmlTpl = htmlTpl.content
  }
  render(tpl) {
    // to preserve this._htmlTpl after appendChild
    const clone = document.importNode(this._htmlTpl, true)
    document.querySelector('#container').innerHTML = ''
    document.querySelector('#container').appendChild(clone)
    this._getTemplateNames().map(tplName => {
      if (! template.hasOwnProperty(tplName)) {
        throw `Template ${tplName} is undefined`
      }
      return template[tplName].render()
    })}
}
class Layout {
  create(name) {
    this[name] = new Lyt()
  }
}
