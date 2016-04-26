{
  template.create('breadcrumb')

  template.breadcrumb.data = () => {
    const {owner, repo, branch, path} = router.params
    const folders = []
    if (path) {
      const pathByFolder = []
      path.split('/').map(elt => {
        pathByFolder.push(`/${elt}`)
        folders.push({
          link: `#${owner}/${repo}/tree/${branch}${pathByFolder.join('')}`,
          label: elt
        })
      })
    }
    const {ownerTpl, repoTpl, foldersTpl} = {
      ownerTpl: {
        label: owner,
        link: `#${owner}`
      },
      repoTpl: {
        label: repo,
        link: `#${owner}/${repo}/tree/${branch}`
      },
      foldersTpl: folders
    }

    template.breadcrumb.html(
      `<ul>
        <li><a href="/">Accueil</a></li>
        <li><a href="${ownerTpl.link}">${ownerTpl.label}</a></li>
        ${repoTpl.label ? `<li><a href="${repoTpl.link}">${repoTpl.label}</a></li>` : ''}` +
        foldersTpl.map(folder =>
        `<li><a href="${folder.link}">${folder.label}</a></li>`
        ).join('\n') +
      `</ul>`)
  }
}
