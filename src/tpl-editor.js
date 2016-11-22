{
  const html = ({link, label, content, edit_url, github_url, row}) => `
    <a name="top"></a>
    <aside class="contribution-tools">
      <a href="${github_url}" title="Voir sur Github" class="github-link tooltip"></a>
      <a href="${edit_url}" title="Editer sur github" class="edit-link tooltip"></a>
      <a href="#multibao/documentation/blob/master/README.md" title="Aide" class="help-link tooltip"></a>
      <a href="#top" class="page-top">Haut de page</a>
    </aside>
    <div id="parentRepo" class="breadcrumbs">
      À retrouver dans le dépôt : <a href="${link}">${label}</a>
    </div>
    <article id="contribution">
        <label for="commit-message">Description de la modification</label>
        <input id="commit-message" placeholder="Modification" name="message" autocomplete="off" type="text">
        <textarea id="commit-description" name="description" placeholder="Ajout d'une description additionnelle"></textarea>
        <button type="submit" id="submit-file">Enregistrer sur Github</button>
        <textarea rows="${row}" cols="72">${content}</textarea>
    </article>
  `
  template.editor = new Template('editor')
  template.editor.data = () => {
    const githubApi = new GithubUrl(router.params)
    githubApi.getMdBlob().then(htmlResponse => {
      const {owner, repo, branch, path} = router.params
      const data = {
        github_url: githubApi.getGithubApiUrl(),
        edit_url: `#${router.url.replace('edit', 'blob')}`,
        content: htmlResponse,
        link: `#${owner}/${repo}/tree/${branch}/` +
          `${path.replace(/(\/|)[0-9A-Za-z\u00C0-\u017F\-\_\.]*$/, '')}`,
        label: `${owner} - ${repo}`,
        row: htmlResponse.split('\n').length * 1.4
      }
      template.editor.html(html(data))
      template.editor.renderAsync()
    })
  }
}
