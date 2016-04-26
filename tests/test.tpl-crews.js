describe('#Crews', () => {
  it('should selected an an option on select html menu.', () => {
    const owner = 'stack'
    const crews = [
      { title: 'E-COMMERCE Threat',
        label: 'Info disclosure',
        owner: 'stack'
      }, {
        title: 'Easy to reproduce',
        label: 'Elevation of privilege',
        owner: 'continuity'
      }]
    expect(crewsWithSelectedClass(owner, crews)[0].classAttr)
      .to.be('selected')
  })
})
