/**
 * Template for repositories list.
 *
 * @param {Object} Data to be injects in the template.
 * {repos [{title, link, label, selected}, ...]}
 *
 * @result {String} A string representing an html list.
 */
const tplRepositories = (data) =>
  `<ul>` +
     data.repos.map(({owner, repo, title, link, label}) =>
      `<li><a title="${title}" href="${link}"` +
      ` data-owner="${owner}" data-repo="${repo}">${label}</a></li>`
     ).join('\n') +
  `</ul>`
/**
 * Attach an event click on repositories list.
 *
 * @param {String} An HTML string representing a github Url contribution.
 */
const selectedRepositories = (ghUrl) => {
  const {owner, repo, branch, filename} = new GithubUrl(ghUrl).ghData
  document.querySelector(`a[data-owner="${owner}"][data-repo="${repo}"]`)
    .classList.add('selected')
}
/**
 * Create data for breadcrumb with a github tree Url.
 *
 * @param {String} A string representing a github Url tree.
 * @result {String} A string representing an html list.
 */
const dataRepositories = () =>
  ({repos: [
    { title: 'daktary : contribs > examples',
      link: '#daktary/contribs/tree/master/examples',
      label: 'daktary-contribs',
      owner: 'daktary',
      repo: 'contribs'
    }, {
      title: 'Démocratie ouverte : contributions',
      link: '#alecoz/democratie_ouverte/tree/master/contributions',
      label: 'Démocratie ouverte',
      owner: 'alecoz',
      repo: 'democratie_ouverte'
    }, {
      title: 'multibao : contributions > contributions',
      link: '#multibao/contributions/tree/master/contributions',
      label: 'multibao',
      owner: 'multibao',
      repo: 'contributions'
    }, {
      title: 'Lilian Ricaud : lilianricaud > Minga',
      link: '#lilianricaud/Minga/tree/master',
      label: 'Lilian Ricaud',
      owner: 'lilianricaud',
      repo: 'Minga'
    }
  ]})
/**
 * Inject HTML code in #breadcrumb tag.
 *
 * @param {String} An HTML string representing a github Url contribution.
 *
 */
const injectRepositories = (ghUrl) => {
  // const
  document.querySelector('#gh-repo-list').innerHTML =
    tplRepositories(dataRepositories())
  selectedRepositories(ghUrl)
}

