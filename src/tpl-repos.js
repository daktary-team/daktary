{
  template.create('repos')

  template.repos.data = () => {
    const apiUrl = new GithubUrl(router.params).toGhRepoApiUrl()
    fetch(apiUrl, {headers: {Accept: 'application/vnd.github.v3'}})
      .then(response => response.json())
      .then(json => {
        const ressources = json.map(({name, type, html_url}) => ({
          name: name,
          type: type,
          git_url: html_url,
          url: `${html_url.match(/^https:\/\/github.com\/(.*)/)[1]}`
        }))
        template.repos.html(
          ressources.map(({name, url, git_url}) =>
            `<article class="gh-list-item gh-type-repo">
               <h2 class="gh-list-title"><a href="#${url}">${name}</a></h2>
               <div class="gh-list-meta">
                 <p>Mis à jour : 02/02/16</p>
                 <p>Créé par : <a href="">pntbr</a> / Contributeurs les plus actifs :
                   <a href="">pntbr</a> / <a href="">wolffgang</a>
                 </p>
                 <p>
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
        template.repos.renderAsync(template.repos._htmlTpl)
      })
  }
}
