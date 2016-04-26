/**
   * An object to manage Github url.
   *
   * @param {String} An HTML string reprsenting a github Url.
   *
   */
class GithubUrl {
  constructor({owner, repo, branch, path}) {
    this.ghData = {
      keys: {
        secret: atob(GH_SECRET),
        id: atob(GH_ID )
      },
      owner: owner,
      repo: repo,
      branch: branch,
      path: path ? `/${path}` : ''
    }
  }
  toGhApiSearch(query) {
    const {owner} = this.ghData
    return `https://api.github.com/search/code` +
           `?q=${query}+language:Markdown+user:${owner}`
  }
  toGhApiUrl() {
    const {keys, owner, repo, branch, path} = this.ghData
    const branchParam = !! branch ? `ref=${branch}&` : ''
    return `https://api.github.com` +
           `/repos/${owner}/${repo}/contents${path}` +
           `?${branchParam}client_id=${keys.id}&client_secret=${keys.secret}`
  }
  toGhRepoApiUrl() {
    const {keys, owner} = this.ghData
    return `https://api.github.com/users/${owner}/repos` +
           `?client_id=${keys.id}&client_secret=${keys.secret}`
  }
}
