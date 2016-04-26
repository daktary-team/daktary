describe('#LAYOUT', () => {
  it('should create basic layout', () => {
    const layout = new Layout()
    layout.create('main')
    expect(layout.main).to.be.an('object')
  })
  it('should retrieves all template names', () => {
    const layout = new Layout()
    layout.create('bee')
    layout.bee.html('<h1>Honney Pot</h1><div data-template="search"></div><hr><div data-template="ruche"></div>')
    expect(layout.bee._getTemplateNames()).to.have.length(2)
    expect(layout.bee._getTemplateNames()).to.be.contain('ruche')
  })
  it('should retrieves simple html', () => {
    const layout = new Layout()
    layout.create('main')
    layout.main.html(`<h1>Hello</h1>`)
    expect(layout.main._htmlTpl.querySelector('h1').innerHTML).to.be('Hello')
  })
})
