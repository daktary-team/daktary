/**
 * Inject HTML code in #container tag.
 *
 */
const injectLayoutViewer = () => {
  const link = document.querySelector('#link-layout-viewer')
  link.addEventListener('load', () => {
    const template = link.import.querySelector('#tpl-viewer')
    clone = document.importNode(template.content, true)
    document.querySelector('#container').appendChild(clone)
    injectContribution(ghUrl)
    injectParentRepo(ghUrl)
  })
}
