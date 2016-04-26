/**
* Add selected in current crew and return the crews list.
*
* @param {String} An HTML string representing a github Url contribution.
* @result {Array} A array with each crew Object.
*/
const crewsWithSelectedClass = (owner, crews) => {
  return crews.map(elt => {
    if (elt.owner === owner) {
      elt.classAttr = 'selected'
    }
    return elt
  })
}
template.create('crews')
template.crews.data = () => {
  const ownerRoute = router.params.owner
  const {crews} = {crews: crewsWithSelectedClass(ownerRoute, CREWS.crews)}
  template.crews.html(
    `<ul>` +
       crews.map(({title, repo, label, link, owner, classAttr}) =>
        `<li><a title="${title}" class="${classAttr}" href="#${owner}"` +
        ` data-owner="${owner}">${label}</a></li>`
       ).join('\n') +
    `</ul>`)
}
