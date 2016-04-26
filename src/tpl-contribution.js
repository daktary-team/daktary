{
  template.create('contribution')

  template.contribution.data = () => {
    const apiUrl = new GithubUrl(router.params).toGhApiUrl()
    fetch(apiUrl, {headers: {Accept: 'application/vnd.github.v3.html'}})
      .then(response => response.text())
      .then(html => {
        template.contribution.html(html)
        template.contribution.renderAsync()
      })
  }
}
