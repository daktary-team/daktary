/**
 * Inject HTML code in #container tag.
 *
 */
const injectLayoutRepos = () => {
  const link = document.querySelector('#link-layout-repositories')
  link.addEventListener('load', () => {
    const template = link.import.querySelector('#tpl-repositories')
    clone = document.importNode(template.content, true)
    document.querySelector('#container').appendChild(clone)
    injectSearch(ghUrl)
    injectRepositories(ghUrl)
    injectBreadcrumb(ghUrl)
    injectRessources(ghUrl)
  })
}
