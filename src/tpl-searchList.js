{
  template.create('searchList')

  template.searchList.data = () => {
    const [req, query, user] = router.queries.q
      .match(/(.*)\+language:Markdown\+user:([0-9A-Za-z\u00C0-\u017F\-\_\.]*)/)
    router.params.owner = user
    const apiUrl = new GithubUrl(router.params).toGhApiSearch(query)
    fetch(apiUrl, {headers: {Accept: 'application/vnd.github.v3.html'}})
      .then(response => response.json())
      .then(json => {
        const ressources = json.items.map(
          ({name, type, path, html_url, repository}) => ({
            name: name,
            type: type,
            prose_url: `http://prose.io/#${html_url.match(/^https:\/\/github.com\/(.*)/)[1]}`.replace('blob', 'edit'),
            git_url: html_url,
            url: `${repository.full_name}/blob/master/${path}`
          }))
        template.searchList.html(
          ressources.map(({type, name, url, prose_url, git_url}) =>
           `<article class="gh-list-item gh-type-${type}">
              <h2 class="gh-list-title"><a href="#${url}">${name}</a></h2>
              <div class="gh-list-meta">
                <p>Mis à jour le : 02/02/16</p>
                <p>Créé par : <a href="">pntbr</a> / Contributeurs les plus actifs :
                  <a href="">pntbr</a> / <a href="">wolffgang</a>
                </p>
                <p>
                 ${type === 'file' ? `<a href="${prose_url}">Editer la fiche</a> - ` : ''}
                 <a href="${git_url}">Voir sur Github</a>
                </p>
              </div>
              <!--si <image--></image-->
              <img src="http://placehold.it/350x150">
              <!--/si image-->
              <p class="gh-list-excerpt">Le début de la fiche qui parle de ...</p>
              <a class="gh-list-readmore"
                title="Lire la suite de la fiche Titre de la fiche"
                href="${url}">Lire la fiche</a>
            </article>`).join('\n')
        )
        template.searchList.renderAsync(template.searchList._htmlTpl)
      })
  }
}
