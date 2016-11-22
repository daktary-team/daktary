{
  const htmlRepositories = ({url, title, folders, files, contributors, github_url, image_url, description, readme_url}) =>
    `<article class="gh-list-item gh-type-repo">
      ${ image_url ? `<img src="${image_url}">` : '' }
      <h2 class="gh-list-title"><a href="#${url}">${title}</a></h2>
      <div class="gh-list-content">
        <div class="gh-list-meta">
          ${ (folders && files) ? `<p>Dossiers : ${folders} - Fiches : ${files}</p>` : '' }
          ${ contributors ? `<p>Contributeurs : ${contributors}</p>` : '' }
          </p>
          <p>
          <a href="${github_url}">Voir sur Github</a>
          </p>
        </div>
        ${ description ? `<p class="gh-list-excerpt">${description}</p>` : '' }
        ${ readme_url ? `<a class="gh-list-readmore"
            title="Lire la suite de la fiche Titre de la fiche"
            href="#${readme_url}">Lire la présentation complète</a>` : ''
        }
      </div>
    </article>`

  template.repositories = new Template('repositories')
  template.repositories.data = () => {
    const githubApi = new GithubUrl(router.params)
    const html = []
    githubApi.getJsonRepo().then(jsonResponse => {
      jsonResponse.map(({name, type, html_url, url}) => {
        const readmeUrl = {owner: router.params.owner, repo: name, branch: 'master', path: 'README.md'}
        const githubApiBlob = new GithubUrl(readmeUrl)
        githubApiBlob.getMdBlob()
          .then(mdResponse => {
            const contribution = new Markdown(mdResponse)
            const metas = contribution.isMetas() ?
            {
              url: html_url.replace('https://github.com/', ''),
              github_url: html_url,
              readme_url: html_url.replace('https://github.com/', '') + '/blob/master/README.md',
              title: contribution.metas.title,
              image_url: contribution.metas.image_url,
              description: contribution.metas.description,
              contributors: contribution.metas.contributors,
              folders: contribution.metas.folders,
              files: contribution.metas.files
            } : {
              url: html_url.replace('https://github.com/', ''),
              github_url: html_url,
              title: name
            }
            html.push(htmlRepositories(metas))
            template.repositories.html(html.join('\n'))
            template.repositories.renderAsync(template.repositories._htmlTpl)
          })
      })
    })
  }
}
