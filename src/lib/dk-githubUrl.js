/**
   * An object to manage Github url.
   *
   * @param {String} An HTML string reprsenting a github Url.
   *
   */
class GithubUrl {
  constructor({owner, repo, branch, path}) {
    this.githubData = {
      keys: {
        secret: atob(GH.SECRET),
        id: atob(GH.ID )
      },
      owner: owner,
      repo: repo,
      branch: branch,
      path: path ? `/${path}` : ''
    }
  }
  _listMd(json) {
    return json.filter((elt) => {
      if (elt.type === 'dir' || elt.name.match(/.md$/)) {
        return elt
      }
    })
  }
  _listByFolder(json) {
    const files = []
    const dirs = []
    json.map((elt) => {
      if (elt.type === 'file') {
        files.push(elt)
      }
      if (elt.type === 'dir') {
        dirs.push(elt)
      }
    })
    return dirs.concat(files)
  }
  toGithubApiSearch(query) {
    const {owner} = this.githubData
    return `https://api.github.com/search/code` +
           `?q=${query}+language:Markdown+user:${owner}`
  }
  toGithubApiUrl() {
    const {keys, owner, repo, branch, path} = this.githubData
    const branchParam = !! branch ? `ref=${branch}&` : ''
    return `https://api.github.com` +
           `/repos/${owner}/${repo}/contents${path}` +
           `?${branchParam}client_id=${keys.id}&client_secret=${keys.secret}`
  }
  toGithubRepoApiUrl() {
    const {keys, owner} = this.githubData
    return `https://api.github.com/users/${owner}/repos` +
           `?client_id=${keys.id}&client_secret=${keys.secret}`
  }
  getGithubApiEditUrl() {
    const {owner, repo, branch, path} = this.githubData
    return `https://github.com/${owner}/${repo}/edit/${branch}${path}`
  }
  getGithubApiUrl() {
    const {owner, repo, branch, path} = this.githubData
    return `https://github.com/${owner}/${repo}/blob/${branch}${path}`
  }
  getHtmlBlob() {
    return new Promise(
      (resolve, reject) => {
        fetch(this.toGithubApiUrl(), {headers: {Accept: 'application/vnd.github.v3.raw'}})
          .then(response => {
            if (response.ok) {
              return response.text()
            } else {
              router.go404()
            }
          })
          .then(htmlResponse => {
            resolve(marked(htmlResponse))
          })
          .catch(error => {
            throw error
          })
      })}
  getMdBlob() {
    return new Promise(
      (resolve, reject) => {
        fetch(this.toGithubApiUrl(), {headers: {Accept: 'application/vnd.github.v3.raw'}})
          .then(response => response.text())
          .then(mdResponse => {
            resolve(mdResponse)
          })
          .catch(error => {
            throw error
          })
      })}
  getJsonRepo() {
    return new Promise(
      (resolve, reject) => {
        fetch(this.toGithubRepoApiUrl(), {headers: {Accept: 'application/vnd.github.v3'}})
          .then(response => response.json())
          .then(json => {
            resolve(json)
          })
          .catch(error => {
            throw error
          })
      })}
  getJsonSearch(query) {
    return new Promise(
      (resolve, reject) => {
        fetch(this.toGithubApiSearch(query), {headers: {Accept: 'application/vnd.github.v3.html'}})
          .then(response => response.json())
          .then(json => {
            resolve(json)
          })
          .catch(error => {
            throw error
          })
      })}
  getJsonFolders() {
    return new Promise(
      (resolve, reject) => {
        fetch(this.toGithubApiUrl(), {headers: {Accept: 'application/vnd.github.v3'}})
          .then(response => response.json())
          .then(json => {
            resolve(this._listByFolder(this._listMd(json)))
          })
          .catch(error => {
            throw error
          })
      })}
}
