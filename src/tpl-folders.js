{
  const htmlContrib = ({url, title, authors, github_url, image_url, description}) =>
    `<article class="gh-list-item gh-type-file">
       ${
         image_url ? `<img src="${image_url}">` : ''
       }
       <h2 class="gh-list-title"><a href="#${url}">${title}</a></h2>
       <div class="gh-list-content">
         <div class="gh-list-meta">
           ${
             authors ? `<p>Mise à jour par : ${authors}</p>` : ''
           }
         </div>
         ${ description ? `<p class="gh-list-excerpt">${description}</p>` : '' }
            ${ (title && url) ?
            `<a class="gh-list-readmore"
                title="Lire la suite de la fiche : ${title}"
                href="#${url}">Lire la suite de la fiche</a>` : ''
            }
       </div>
     </article>`

  const htmlFolder = ({url, readme_url, title, folders, files, contributors, github_url, image_url, description}) =>
    `<article class="gh-list-item gh-type-folder">
          ${ image_url ? `<img src="${image_url}">` : '' }
          <h2 class="gh-list-title"><a href="#${url}">${title}</a></h2>
          <div class="gh-list-content">
            <div class="gh-list-meta">
              ${ (folders && files) ? `<p>Dossiers : ${folders} - Fiches : ${files}</p>` : '' }
              ${ contributors ? `<p>Contributeurs : ${contributors}</p>` : '' }
              </p>
              <p><a href="${github_url}">Voir sur Github</a></p>
            </div>
            ${ description ? `<p class="gh-list-excerpt">${description}</p>` : '' }
            ${ (title && readme_url) ?
            `<a class="gh-list-readmore"
                title="Lire la suite de la fiche : ${title}"
                href="#${readme_url}">Lire la présentation complète</a>` : ''
            }
          </div>
        </article>`

  template.folders = new Template('folders')
  template.folders.data = () => {
    const githubApi = new GithubUrl(router.params)
    const html = []
    githubApi.getJsonFolders()
      .then(jsonResponse => {
        jsonResponse.map(({name, type, html_url}) => {
          if (type === 'file') {
            const readmeUrl = {owner: router.params.owner, repo: router.params.repo, branch: 'master', path: `${(router.params.path) ? `${router.params.path}/${name}` : name}`}
            const githubApiBlob = new GithubUrl(readmeUrl)
            githubApiBlob.getMdBlob()
              .then(mdResponse => {
                const contribution = new Markdown(mdResponse)
                const metas = contribution.isMetas() ?
                  {
                    prose_url: `http://prose.io/#${html_url.match(/^https:\/\/github.com\/(.*)/)[1]}`.replace('blob', 'edit'),
                    git_url: html_url,
                    title: contribution.metas.title || name,
                    url: `${html_url.match(/^https:\/\/github.com\/(.*)/)[1]}`,
                    description: contribution.metas.description,
                    authors: contribution.metas.authors,
                    image_url: contribution.metas.image_url
                  } : {
                    title: name,
                    url: `${html_url.match(/^https:\/\/github.com\/(.*)/)[1]}`,
                    git_url: html_url
                  }
                html.push(htmlContrib(metas))
                template.folders.html(html.join('\n'))
                template.folders.renderAsync(template.folders._htmlTpl)
              })
          } else {
            const readmeUrl = {owner: router.params.owner, repo: name, branch: 'master', path: `${(router.params.path) ? `${router.params.path}/README.md` : 'README.md'}`}
            const githubApiBlob = new GithubUrl(readmeUrl)
            githubApiBlob.getMdBlob()
              .then(mdResponse => {
                const folder = new Markdown(mdResponse)
                const metas = folder.isMetas() ?
                  {
                    url: `${html_url.match(/^https:\/\/github.com\/(.*)/)[1]}`,
                    title: folder.metas.title || name,
                    github_url: html_url,
                    folders: folder.metas.folders,
                    files: folder.metas.files,
                    contributors: folder.metas.contributors,
                    description: folder.metas.description,
                    image_url: folder.metas.image_url
                  } : {
                    title: name,
                    github_url: html_url,
                    url: `${html_url.match(/^https:\/\/github.com\/(.*)/)[1]}`
                  }
                html.push(htmlFolder(metas))
                template.folders.html(html.join('\n'))
                template.folders.renderAsync(template.folders._htmlTpl)
              })
          }
        })
      })
  }
}
