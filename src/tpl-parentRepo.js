{
  template.create('parentRepo')

  template.parentRepo.data = () => {
    const {owner, repo, branch, path} = router.params
    const {link, label} = {
      link: `#${owner}/${repo}/tree/${branch}/` +
        `${path.replace(/(\/|)[0-9A-Za-z\u00C0-\u017F\-\_\.]*$/, '')}`,
      label: `${owner} - ${repo}`
    }
    template.parentRepo.html(
      `À retrouver dans le dépôt : <a href="${link}">${label}</a>`)
  }
}
