{
  const htmlSearch = ({url, title, authors, image_url, description}) =>
    `<article class="gh-list-item gh-type-file">
       <h2 class="gh-list-title"><a href="#${url}">${title}</a></h2>
       <div class="gh-list-content">
         <div class="gh-list-meta">
           ${ authors ? `<p>Créé par : ${authors}</p>` : '' }
         </div>
         ${ image_url ? `<img src="${image_url}">` : '' }
         ${ description ? ` <p class="gh-list-excerpt">${description}</p>` : '' }
         <a class="gh-list-readmore"
           title="Lire la suite de la fiche : $(titre)"
           href="#${url}">Lire la fiche</a>
       </div>
     </article>`

  template.searchList = new Template('searchList')
  template.searchList.data = () => {
    const [req, query, user] = router.queries.q
      .match(/(.*)\+language:Markdown\+user:([0-9A-Za-z\u00C0-\u017F\-\_\.]*)/)
    router.params.owner = user
    const githubApi = new GithubUrl(router.params)
    const html = []
    githubApi.getJsonSearch(query).then(jsonResponse => {
      jsonResponse.items.map(({name, path, html_url, repository}) => {
        const readmeUrl = {owner: router.params.owner, repo: repository.name, branch: 'master', path: path}
        const githubApiBlob = new GithubUrl(readmeUrl)
        githubApiBlob.getMdBlob()
          .then(mdResponse => {
            const contribution = new Markdown(mdResponse)
            const metas = contribution.isMetas() ?
              {
                prose_url: `http://prose.io/#${html_url.match(/^https:\/\/github.com\/(.*)/)[1]}`.replace('blob', 'edit'),
                git_url: html_url,
                url: `${repository.full_name}/blob/master/${path}`,
                description: contribution.metas.description,
                title: contribution.metas.title,
                authors: contribution.metas.contributors,
                image_url: contribution.metas.image_url
              } : {
                title: name,
                url: `${repository.full_name}/blob/master/${path}`
              }
            html.push(htmlSearch(metas))
            template.searchList.html(html.join('\n'))
            template.searchList.renderAsync(template.searchList._htmlTpl)
          })
      })
    })
  }
}
