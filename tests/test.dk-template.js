describe('#TEMPLATE', () => {
  it('should create basic template', () => {
    const template = new Template()
    template.create('main')
    expect(template.main).to.be.an('object')
  })
  it('should retrieve template\'s name', () => {
    const template = new Template()
    template.create('paladin')
    expect(template.paladin._name).to.be('paladin')
  })
  it('should retrieve template\'s name', () => {
    const template = new Template()
    template.create('paladin')
    template.paladin.html(`<h1>Hello</h1>`)
    template.paladin.events({
      'click h1': '',
      'keypress h1': ''
    })
    expect(template.paladin._events).to.have.property('keypress h1')
  })
  it('should retrieves simple html of a template', () => {
    const template = new Template()
    template.create('main')
    template.main.html(`<h1>Hello</h1>`)
    expect(template.main._htmlTpl.querySelector('h1').innerHTML).to.be('Hello')
  })
  it('should retrieves html and data of a template', () => {
    const template = new Template()
    template.create('main')
    const {wat} = {
      wat: 'world'
    }
    template.main.html(`<h1>Hello ${wat}</h1>`)
    expect(template.main._htmlTpl.querySelector('h1').innerHTML).to.be('Hello world')
  })
  it('should retrieves html with async data', (done) => {
    const template = new Template()
    template.create('paladin')
    window.setTimeout(() => {
      const {world} = {world: 'World!'}
      template.paladin.html(`<h1>Hello ${world}</h1>`)
      expect(template.paladin._htmlTpl.querySelector('h1').innerHTML).to.be('Hello World!')
      done()
    }, 500)
  })
})
