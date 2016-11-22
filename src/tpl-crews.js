/**
* Add selected in current crew and return the crews list.
*
* @param {String} An HTML string representing a github Url contribution.
* @result {Array} A array with each crew Object.
*/
{
  const htmlWithMetas = ({title, label, owner, classAttr}) =>
    `<li><a title="${title}" href="#${owner}" data-owner="${owner}">
       <h3>${label}</h3><p>${title}</p></a>
     </li>`

  template.crews = new Template('crews')
  template.crews.data = () => {
    const githubApi = new GithubUrl({owner: GH.OWNER, repo: GH.CREW })
    const html = []
    githubApi.getJsonFolders()
      .then(jsonResponse => {
        jsonResponse.map((elt) => {
          if (elt.name === 'README.md') {
            return
          }
          const readmeUrl = {owner: GH.OWNER, repo: GH.CREW, branch: 'master', path: elt.name}
          const githubApiBlob = new GithubUrl(readmeUrl)
          githubApiBlob.getMdBlob()
            .then(mdResponse => {
              const contribution = new Markdown(mdResponse)
              if (contribution.isMetas()) {
                const metas = {
                  label: contribution.metas.label,
                  title: contribution.metas.title,
                  owner: contribution.metas.owner
                }
                html.push(htmlWithMetas(metas))
              }
              template.crews.html(html.join('\n'))
              template.crews.renderAsync(template.crews._htmlTpl)
            })
        })
      })
  }
}
