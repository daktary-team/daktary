{
  const html = ({link, label, content, edit_url, github_url}) => `
    <a name="top"></a>
    <aside class="contribution-tools">
      <a href="${github_url}" title="Voir sur Github" class="github-link tooltip"></a>
      <a href="#multibao/documentation/blob/master/README.md" title="Aide" class="help-link tooltip"></a>
      <a href="#top" class="page-top">Haut de page</a>
    </aside>
    <div id="parentRepo" class="breadcrumbs">
      À retrouver dans le dépôt : <a href="${link}">${label}</a>
    </div>
    <article id="contribution">
      ${content}
    </article>
  `
  template.contribution = new Template('contribution')
  template.contribution.data = () => {
    const githubApi = new GithubUrl(router.params)
    githubApi.getHtmlBlob().then(htmlResponse => {
      const {owner, repo, branch, path} = router.params
      const data = {
        github_url: githubApi.getGithubApiUrl(),
        edit_url: `#${router.url.replace('blob', 'edit')}`,
        content: htmlResponse,
        link: `#${owner}/${repo}/tree/${branch}/` +
          `${path.replace(/(\/|)[0-9A-Za-z\u00C0-\u017F\-\_\.]*$/, '')}`,
        label: `${owner} - ${repo}`
      }
      template.contribution.html(html(data))
      template.contribution.renderAsync()
    })
  }
}
