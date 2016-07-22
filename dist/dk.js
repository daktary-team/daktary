'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
   * An object to manage Github url.
   *
   * @param {String} An HTML string reprsenting a github Url.
   *
   */

var GithubUrl = function () {
  function GithubUrl(_ref) {
    var owner = _ref.owner;
    var repo = _ref.repo;
    var branch = _ref.branch;
    var path = _ref.path;

    _classCallCheck(this, GithubUrl);

    this.ghData = {
      keys: {
        secret: atob(GH_SECRET),
        id: atob(GH_ID)
      },
      owner: owner,
      repo: repo,
      branch: branch,
      path: path ? '/' + path : ''
    };
  }

  _createClass(GithubUrl, [{
    key: '_listMd',
    value: function _listMd(json) {
      return json.filter(function (elt) {
        if (elt.type === 'dir' || elt.name.match(/.md$/)) {
          return elt;
        }
      });
    }
  }, {
    key: '_listByFolder',
    value: function _listByFolder(json) {
      var files = [];
      var dirs = [];
      json.map(function (elt) {
        if (elt.type === 'file') {
          files.push(elt);
        }
        if (elt.type === 'dir') {
          dirs.push(elt);
        }
      });
      return dirs.concat(files);
    }
  }, {
    key: 'toGhApiSearch',
    value: function toGhApiSearch(query) {
      var owner = this.ghData.owner;

      return 'https://api.github.com/search/code' + ('?q=' + query + '+language:Markdown+user:' + owner);
    }
  }, {
    key: 'toGhApiUrl',
    value: function toGhApiUrl() {
      var _ghData = this.ghData;
      var keys = _ghData.keys;
      var owner = _ghData.owner;
      var repo = _ghData.repo;
      var branch = _ghData.branch;
      var path = _ghData.path;

      var branchParam = !!branch ? 'ref=' + branch + '&' : '';
      return 'https://api.github.com' + ('/repos/' + owner + '/' + repo + '/contents' + path) + ('?' + branchParam + 'client_id=' + keys.id + '&client_secret=' + keys.secret);
    }
  }, {
    key: 'toGhRepoApiUrl',
    value: function toGhRepoApiUrl() {
      var _ghData2 = this.ghData;
      var keys = _ghData2.keys;
      var owner = _ghData2.owner;

      return 'https://api.github.com/users/' + owner + '/repos' + ('?client_id=' + keys.id + '&client_secret=' + keys.secret);
    }
  }, {
    key: 'getProseUrl',
    value: function getProseUrl() {
      var _ghData3 = this.ghData;
      var owner = _ghData3.owner;
      var repo = _ghData3.repo;
      var branch = _ghData3.branch;
      var path = _ghData3.path;

      return 'http://prose.io/#' + owner + '/' + repo + '/edit/' + branch + path;
    }
  }, {
    key: 'getGhUrl',
    value: function getGhUrl() {
      var _ghData4 = this.ghData;
      var owner = _ghData4.owner;
      var repo = _ghData4.repo;
      var branch = _ghData4.branch;
      var path = _ghData4.path;

      return 'https://github.com/' + owner + '/' + repo + '/blob/' + branch + path;
    }
  }, {
    key: 'getHtmlBlob',
    value: function getHtmlBlob() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        fetch(_this.toGhApiUrl(), { headers: { Accept: 'application/vnd.github.v3.html' } }).then(function (response) {
          return response.text();
        }).then(function (htmlResponse) {
          resolve(htmlResponse);
        });
      });
    }
  }, {
    key: 'getMdBlob',
    value: function getMdBlob() {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        fetch(_this2.toGhApiUrl(), { headers: { Accept: 'application/vnd.github.v3.raw' } }).then(function (response) {
          return response.text();
        }).then(function (mdResponse) {
          resolve(mdResponse);
        });
      });
    }
  }, {
    key: 'getJsonRepo',
    value: function getJsonRepo() {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        fetch(_this3.toGhRepoApiUrl(), { headers: { Accept: 'application/vnd.github.v3' } }).then(function (response) {
          return response.json();
        }).then(function (json) {
          resolve(json);
        });
      });
    }
  }, {
    key: 'getJsonSearch',
    value: function getJsonSearch(query) {
      var _this4 = this;

      return new Promise(function (resolve, reject) {
        fetch(_this4.toGhApiSearch(query), { headers: { Accept: 'application/vnd.github.v3.html' } }).then(function (response) {
          return response.json();
        }).then(function (json) {
          resolve(json);
        });
      });
    }
  }, {
    key: 'getJsonFolders',
    value: function getJsonFolders() {
      var _this5 = this;

      return new Promise(function (resolve, reject) {
        fetch(_this5.toGhApiUrl(), { headers: { Accept: 'application/vnd.github.v3' } }).then(function (response) {
          return response.json();
        }).then(function (json) {
          resolve(_this5._listByFolder(_this5._listMd(json)));
        });
      });
    }
  }]);

  return GithubUrl;
}();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Layout = function () {
  function Layout() {
    _classCallCheck(this, Layout);

    this._htmlTpl = '';
  }

  _createClass(Layout, [{
    key: '_getTemplateNames',
    value: function _getTemplateNames() {
      return Array.from(this._htmlTpl.querySelectorAll('[data-template]')).map(function (div) {
        return div.getAttribute('data-template');
      });
    }
  }, {
    key: 'html',
    value: function html(_html) {
      var htmlTpl = document.createElement('template');
      htmlTpl.innerHTML = _html;
      this._htmlTpl = htmlTpl.content;
    }
  }, {
    key: 'render',
    value: function render(tpl) {
      // to preserve this._htmlTpl after appendChild
      var clone = document.importNode(this._htmlTpl, true);
      document.querySelector('#container').innerHTML = '';
      document.querySelector('#container').appendChild(clone);
      this._getTemplateNames().map(function (tplName) {
        if (!template.hasOwnProperty(tplName)) {
          throw 'Template ' + tplName + ' is undefined';
        }
        return template[tplName].render();
      });
    }
  }]);

  return Layout;
}();
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Markdown = function () {
  function Markdown(content) {
    _classCallCheck(this, Markdown);

    this.content = content;
    this.metas = {};
    if (this.isMetas()) {
      this._extractMetas();
    }
  }

  _createClass(Markdown, [{
    key: 'isMetas',
    value: function isMetas() {
      return !!this.content.match(/---([\s\S]*?)---/);
    }
  }, {
    key: '_extractMetas',
    value: function _extractMetas() {
      var _this = this;

      var labelList = '';
      this.content.match(/---([\s\S]*?)---/)[1].split('\n').map(function (elt) {
        if (!!elt.match(/^\w+:$/)) {
          var _elt$match = elt.match(/^(\w+):$/);

          var _elt$match2 = _slicedToArray(_elt$match, 2);

          var label = _elt$match2[1];

          _this.metas[label] = [];
          labelList = label;
        }
        if (elt.match(/^  - [\s\S]*?$/)) {
          var _elt$match3 = elt.match(/^  - ([\s\S]*?)$/);

          var _elt$match4 = _slicedToArray(_elt$match3, 2);

          var content = _elt$match4[1];

          _this.metas[labelList].push(content);
        }
        if (elt.match(/^\w+: [\s\S]*?$/)) {
          var _elt$match5 = elt.match(/^(\w+): ([\s\S]*?)$/);

          var _elt$match6 = _slicedToArray(_elt$match5, 3);

          var _label = _elt$match6[1];
          var _content = _elt$match6[2];

          _this.metas[_label] = _content.trim();
        }
      });
    }
  }]);

  return Markdown;
}();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
   * A Router to manage client side url.
   *
   * @param {String} An HTML string reprsenting an arguments
   * and queries option Url.
   *
   */

var Router = function () {
  function Router() {
    _classCallCheck(this, Router);

    this.url = '';
    this.currentRoute = '';
    this.injectLayout = function () {};
    this._routes = [];
    this.params = {};
    this.queries = {};
    if (this._isOffLine()) {
      this._go503();
    }
  }

  _createClass(Router, [{
    key: '_isOffLine',
    value: function _isOffLine() {
      return !navigator.onLine;
    }
  }, {
    key: '_go503',
    value: function _go503() {
      window.location = './503.html';
    }
  }, {
    key: '_urlWithoutParams',
    value: function _urlWithoutParams() {
      return this.url.split('?')[0];
    }
  }, {
    key: '_resetRoute',
    value: function _resetRoute() {
      this.currentRoute = '';
      this.layout = '';
      this.params = {};
      this.queries = {};
    }
  }, {
    key: '_setQueryParameters',
    value: function _setQueryParameters() {
      var _this = this;

      var queries = this.url.split('?')[1];
      if (queries) {
        queries.split('&').map(function (query) {
          _this.queries[query.split('=')[0]] = query.split('=')[1];
        });
      }
    }
  }, {
    key: '_setParams',
    value: function _setParams(pattern) {
      var patternItems = pattern.split('/');
      var urlValues = this._urlWithoutParams().split('/');
      for (var index in patternItems) {
        // Store all remain values
        var patternItem = patternItems[index];
        if (!patternItem.startsWith(':')) {
          continue;
        }
        var paramName = patternItem.match(/^:(\w+)/)[1];
        if (patternItem.indexOf('(.*)') !== -1) {
          this.params[paramName] = urlValues.slice(index).join('/');
          // Store single value
        } else {
            this.params[paramName] = urlValues[index];
          }
      }
    }
  }, {
    key: '_patternToRegex',
    value: function _patternToRegex(pattern) {
      var regex = ['^'];
      pattern.split('/').map(function (patternItem) {
        // Capture a parameter
        if (patternItem.startsWith(':')) {
          var regTmp = '[0-9A-Za-zÀ-ſ-_.]*';
          // Capture all the parameters
          if (patternItem.endsWith('(.*)')) {
            regTmp = '[0-9A-Za-zÀ-ſ-_./]*';
          }
          // Capture optional parameters
          if (patternItem.endsWith('?')) {
            regex.pop();
            regTmp = '(/[0-9A-Za-zÀ-ſ-_./]*|)';
          }
          regex.push(regTmp);
        } else {
          // Capture a fixed parameter
          regex.push(patternItem);
        }
        regex.push('\/');
      });
      regex.pop();
      regex.push('$');
      return regex.join('');
    }
  }, {
    key: '_checkPatternWithUrl',
    value: function _checkPatternWithUrl(pattern) {
      return !!this._urlWithoutParams().match(this._patternToRegex(pattern));
    }
  }, {
    key: '_findAndSetCurrentRoute',
    value: function _findAndSetCurrentRoute() {
      var route = {};
      for (var index in this._routes) {
        route = this._routes[index];
        if (this._checkPatternWithUrl(route.pattern)) {
          // Execute the action attach on a route
          this._setParams(route.pattern);
          this._setQueryParameters();route.action.bind(this)();
          break;
        }
      }
      return route;
    }
  }, {
    key: 'isNoRoute',
    value: function isNoRoute() {
      return !this.currentRoute;
    }
  }, {
    key: 'go',
    value: function go(url) {
      this._resetRoute();
      this.url = url || '/';
      this._findAndSetCurrentRoute();
      this.injectLayout();
    }
  }, {
    key: 'route',
    value: function route(pattern, action) {
      this._routes.push({
        pattern: pattern,
        action: action
      });
    }
  }]);

  return Router;
}();
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Template = function () {
  function Template(name) {
    _classCallCheck(this, Template);

    this._htmlTpl = '';
    this._name = name;
    this._events = {};
    this.data = function () {};
  }

  _createClass(Template, [{
    key: 'html',
    value: function html(_html) {
      var htmlTpl = document.createElement('template');
      htmlTpl.innerHTML = _html;
      this._htmlTpl = htmlTpl.content;
      // we don't want to inherits of old events
      this._events = {};
    }
  }, {
    key: '_renderEvents',
    value: function _renderEvents(clone) {
      var _this = this;

      var _loop = function _loop(event) {
        var _event$split = event.split(' ');

        var _event$split2 = _slicedToArray(_event$split, 2);

        var evtType = _event$split2[0];
        var evtSelector = _event$split2[1];

        var func = _this._events[event];
        clone.querySelector(evtSelector).addEventListener(evtType, function (evt) {
          return func(evt);
        });
      };

      for (var event in this._events) {
        _loop(event);
      }
      return clone;
    }
  }, {
    key: '_injectHtml',
    value: function _injectHtml() {
      var selector = '[data-template="' + this._name + '"]';
      var clone = document.importNode(this._htmlTpl, true);
      this._renderEvents(clone);
      document.querySelector(selector).innerHTML = '';
      document.querySelector(selector).appendChild(clone);
    }
  }, {
    key: 'renderAsync',
    value: function renderAsync() {
      this._injectHtml();
    }
  }, {
    key: 'render',
    value: function render() {
      this.data();
      if (this._htmlTpl) {
        this._injectHtml();
      }
    }
  }, {
    key: 'events',
    value: function events(_events) {
      this._events = _events;
    }
  }]);

  return Template;
}();
'use strict';

var GH_SECRET = 'YWU0ZmRkZGFjOTVlZGM1ZTc1MmI3NjRjZTI3Y2UxZGYyMzdmZTdkZg==';
var GH_ID = 'ODUzMjY1YjA5YjBjMjVlOTg2MTQ=';

var OWNER = 'multibao';
'use strict';

window.addEventListener('hashchange', function () {
  var ghUrl = window.location.toString().split('#')[1];
  var anchor = document.querySelector('a[name="' + ghUrl + '"]');
  if (anchor) {
    anchor.scrollIntoView();
    window.location = '#' + router.url;
  } else {
    router.go(ghUrl);
    if (undefined.currentRoute !== 'home') {
      window.location = '#' + ghUrl;
    }
  }
});
window.addEventListener('load', function () {
  var ghUrl = window.location.toString().split('#')[1];
  router.go(ghUrl);
  if (router.isNoRoute()) {
    window.location = './404.html';
    window.location.reload(true);
  }
});
var template = {};
var layout = {};
'use strict';

/**
 * Layout for manage and display Github repositories.
 *
 */
{
  layout.folders = new Layout('folders');
  layout.folders.html('\n  <header class="container">\n    <h1><a href="">multi<span>BàO</span></a></h1>\n    <div id="search-engine-wrapper" class="search-engine-wrapper" data-template="search">\n    </div>\n  </header>\n  <main class="container">\n    <div id="breadcrumb" class="breadcrumb" data-template="breadcrumb">\n    </div>\n    <section id="gh-list" class="gh-list" data-template="folders">\n    </section>\n  </main>');
}
'use strict';

{
  layout.home = new Layout('home');
  layout.home.html('\n  <header class="home-header clearfix container">\n    <h1>multi<span>BàO</span></h1>\n  </header>\n  <main>\n    <section class="home-intro">\n        <div class="home-intro-content container">\n          <h2>Open-bar de pratiques collaboratives<span>Rédiger et partager vos expériences</span></h2>\n          <a href="#multibao/contributions/blob/master/pages/commencer_ici.md">Commencer ici</a>\n          <a href="#multibao/documentation/blob/master/README.md">Guide d\'utilisation</a>\n        </div>\n    </section>\n    <section id="gh-crew-list" class="container">\n      <ul data-template="crews">\n      </ul>\n    </section>\n  </main>');
}
'use strict';

/**
 * Layout for manage and display Github repositories.
 *
 */
{
  layout.repos = new Layout('repos');
  layout.repos.html('\n  <header class="container">\n    <h1><a href="">multi<span>BàO</span></a></h1>\n    <div id="search-engine-wrapper" class="search-engine-wrapper" data-template="search">\n    </div>\n  </header>\n  <main class="container">\n    <div id="breadcrumb" class="breadcrumb" data-template="breadcrumb">\n    </div>\n    <section id="gh-list" class="gh-list" data-template="repos">\n    </section>\n  </main>');
}
'use strict';

/**
 * Layout for manage and display Github repositories.
 *
 */
{
  layout.searchList = new Layout('searchList');
  layout.searchList.html('\n  <header class="container">\n    <h1><a href="">multi<span>BàO</span></a></h1>\n    <div id="search-engine-wrapper" class="search-engine-wrapper" data-template="search">\n    </div>\n  </header>\n  <main class="container">\n    <!--\n    <section class="search-result search-result-blank">\n    il n\'y a pas de résultat pour la recherche <span>agilité</span> dans le repo <a href=""> Super repo de démo</a>\n    </section>\n    <section class="search-result">\n      <span>3</span> résultat(s) pour la recherche <span>agilité</span> dans le repo <a href=""> Super repo de démo</a>\n    </section>\n    -->\n    <section id="gh-list" class="gh-list" data-template="searchList">\n    </section>\n  </main>');
}
'use strict';

/**
* Layout for manage and display Github contribution.
*
*/
{
  layout.viewer = new Layout('viewer');
  layout.viewer.html('\n    <main data-template="contribution" class="container">\n    </main>\n  ');
}
'use strict';

// Create a router
var router = new Router();

router.route('/', function () {
  this.currentRoute = 'home';
  layout.home.render();
});
router.route('search/code', function () {
  this.currentRoute = 'search';
  layout.searchList.render();
});
router.route(':owner/:repo/blob/:branch/:path(.*)', function () {
  this.currentRoute = 'blob';
  layout.viewer.render();
});
router.route(':owner/:repo/tree/:branch/:path(.*)?', function () {
  this.currentRoute = 'tree';
  layout.folders.render();
});
router.route(':owner/:repo', function () {
  this.currentRoute = 'list';
  layout.folders.render();
});
router.route(':owner', function () {
  this.currentRoute = 'repos';
  layout.repos.render();
});
'use strict';

{
  template.breadcrumb = new Template('breadcrumb');
  template.breadcrumb.data = function () {
    var _router$params = router.params;
    var owner = _router$params.owner;
    var repo = _router$params.repo;
    var branch = _router$params.branch;
    var path = _router$params.path;

    var folders = [];
    if (path) {
      (function () {
        var pathByFolder = [];
        path.split('/').map(function (elt) {
          pathByFolder.push('/' + elt);
          folders.push({
            link: '#' + owner + '/' + repo + '/tree/' + branch + pathByFolder.join(''),
            label: elt
          });
        });
      })();
    }
    var _ownerTpl$repoTpl$fol = {
      ownerTpl: {
        label: owner,
        link: '#' + owner
      },
      repoTpl: {
        label: repo,
        link: '#' + owner + '/' + repo + '/tree/' + branch
      },
      foldersTpl: folders
    };
    var ownerTpl = _ownerTpl$repoTpl$fol.ownerTpl;
    var repoTpl = _ownerTpl$repoTpl$fol.repoTpl;
    var foldersTpl = _ownerTpl$repoTpl$fol.foldersTpl;


    template.breadcrumb.html('<ul>\n        <li><a href="#">Accueil</a></li>\n        <li><a href="' + ownerTpl.link + '">' + ownerTpl.label + '</a></li>\n        ' + (repoTpl.label ? '<li><a href="' + repoTpl.link + '">' + repoTpl.label + '</a></li>' : '') + foldersTpl.map(function (folder) {
      return '<li><a href="' + folder.link + '">' + folder.label + '</a></li>';
    }).join('\n') + '</ul>');
  };
}
'use strict';

{
  (function () {
    var html = function html(_ref) {
      var link = _ref.link;
      var label = _ref.label;
      var content = _ref.content;
      var prose_url = _ref.prose_url;
      var git_url = _ref.git_url;
      return '\n    <a name="top"></a>\n    <aside class="contribution-tools">\n      <a href="' + git_url + '" class="github-link">Voir sur Github</a>\n      <a href="' + prose_url + '" class="proseio-link">Editer sur prose.io</a>\n      <a href="#multibao/documentation/blob/master/README.md" class="help-link">Aide</a>\n      <a href="#top" class="page-top">Haut de page</a>\n    </aside>\n    <div id="parentRepo" class="breadcrumbs">\n      À retrouver dans le dépôt : <a href="' + link + '">' + label + '</a>\n    </div>\n    <article id="contribution">\n      ' + content + '\n    </article>\n  ';
    };
    template.contribution = new Template('contribution');
    template.contribution.data = function () {
      var ghApi = new GithubUrl(router.params);
      ghApi.getHtmlBlob().then(function (htmlResponse) {
        var _router$params = router.params;
        var owner = _router$params.owner;
        var repo = _router$params.repo;
        var branch = _router$params.branch;
        var path = _router$params.path;

        var data = {
          git_url: ghApi.getGhUrl(),
          prose_url: ghApi.getProseUrl(),
          content: htmlResponse,
          link: '#' + owner + '/' + repo + '/tree/' + branch + '/' + ('' + path.replace(/(\/|)[0-9A-Za-z\u00C0-\u017F\-\_\.]*$/, '')),
          label: owner + ' - ' + repo
        };
        template.contribution.html(html(data));
        template.contribution.renderAsync();
      });
    };
  })();
}
'use strict';

/**
* Add selected in current crew and return the crews list.
*
* @param {String} An HTML string representing a github Url contribution.
* @result {Array} A array with each crew Object.
*/
{
  (function () {
    var htmlWithMetas = function htmlWithMetas(_ref) {
      var title = _ref.title;
      var label = _ref.label;
      var owner = _ref.owner;
      var classAttr = _ref.classAttr;
      return '<li><a title="' + title + '" href="#' + owner + '" data-owner="' + owner + '">\n       <h3>' + label + '</h3><p>' + title + '</p></a>\n     </li>';
    };

    template.crews = new Template('crews');
    template.crews.data = function () {
      var ghApi = new GithubUrl({ owner: OWNER, repo: 'organisations' });
      var html = [];
      ghApi.getJsonFolders().then(function (jsonResponse) {
        jsonResponse.map(function (elt) {
          if (elt.name === 'README.md') {
            return;
          }
          var readmeUrl = { owner: OWNER, repo: 'organisations', branch: 'master', path: elt.name };
          var ghApiBlob = new GithubUrl(readmeUrl);
          ghApiBlob.getMdBlob().then(function (mdResponse) {
            var contribution = new Markdown(mdResponse);
            if (contribution.isMetas()) {
              var metas = {
                label: contribution.metas.label,
                title: contribution.metas.title,
                owner: contribution.metas.owner
              };
              html.push(htmlWithMetas(metas));
            }
            template.crews.html(html.join('\n'));
            template.crews.renderAsync(template.crews._htmlTpl);
          });
        });
      });
    };
  })();
}
'use strict';

{
  (function () {
    var htmlContribWithMetas = function htmlContribWithMetas(_ref) {
      var url = _ref.url;
      var title = _ref.title;
      var authors = _ref.authors;
      var git_url = _ref.git_url;
      var prose_url = _ref.prose_url;
      var image_url = _ref.image_url;
      var description = _ref.description;
      return '<article class="gh-list-item gh-type-file">\n       <h2 class="gh-list-title"><a href="#' + url + '">' + title + '</a></h2>\n       <div class="gh-list-content">\n         <div class="gh-list-meta">\n           <p>Mise à jour par : ' + authors + '</p>\n         </div>\n         <img src="' + image_url + '">\n         <p class="gh-list-excerpt">' + description + '</p>\n         <a class="gh-list-readmore"\n           title="Lire la suite de la fiche : ' + title + '"\n           href="#' + url + '">Lire la fiche</a>\n       </div>\n     </article>';
    };

    var htmlContribNoMetas = function htmlContribNoMetas(_ref2) {
      var url = _ref2.url;
      var title = _ref2.title;
      return '<article class="gh-list-item gh-type-file">\n        <h2 class="gh-list-title"><a href="#' + url + '">' + title + '</a></h2>\n     </article>';
    };

    var htmlFolderWithMetas = function htmlFolderWithMetas(_ref3) {
      var url = _ref3.url;
      var title = _ref3.title;
      var folders = _ref3.folders;
      var files = _ref3.files;
      var contributors = _ref3.contributors;
      var git_url = _ref3.git_url;
      var image_url = _ref3.image_url;
      var description = _ref3.description;
      return '<article class="gh-list-item gh-type-folder">\n          <h2 class="gh-list-title"><a href="#' + url + '">' + title + '</a></h2>\n          <div class="gh-list-content">\n            <div class="gh-list-meta">\n              <p>Dossiers : ' + folders + ' - Fiches : ' + files + '</p>\n              <p>Contributeurs : ' + contributors + '</p>\n              </p>\n              <p>\n                <a href="' + git_url + '">Voir sur Github</a>\n              </p>\n            </div>\n            <img src="' + image_url + '">\n            <p class="gh-list-excerpt">' + description + '</p>\n            <a class="gh-list-readmore"\n                title="Lire la suite de la fiche : ' + title + '"\n                href="#' + url + '">Lire la présentation complète</a>\n          </div>\n        </article>';
    };
    var htmlFolderNoMetas = function htmlFolderNoMetas(_ref4) {
      var url = _ref4.url;
      var title = _ref4.title;
      return '<article class="gh-list-item gh-type-folder">\n      <h2 class="gh-list-title"><a href="#' + url + '">' + title + '</a></h2>\n    </article>';
    };

    template.folders = new Template('folders');
    template.folders.data = function () {
      var ghApi = new GithubUrl(router.params);
      var html = [];
      ghApi.getJsonFolders().then(function (jsonResponse) {
        jsonResponse.map(function (_ref5) {
          var name = _ref5.name;
          var type = _ref5.type;
          var html_url = _ref5.html_url;

          if (type === 'file') {
            var readmeUrl = { owner: router.params.owner, repo: router.params.repo, branch: 'master', path: '' + (router.params.path ? router.params.path + '/' + name : name) };
            var ghApiBlob = new GithubUrl(readmeUrl);
            ghApiBlob.getMdBlob().then(function (mdResponse) {
              var contribution = new Markdown(mdResponse);
              if (contribution.isMetas()) {
                var metas = {
                  prose_url: ('http://prose.io/#' + html_url.match(/^https:\/\/github.com\/(.*)/)[1]).replace('blob', 'edit'),
                  git_url: html_url,
                  url: '' + html_url.match(/^https:\/\/github.com\/(.*)/)[1],
                  description: contribution.metas.description,
                  title: contribution.metas.title || name,
                  authors: contribution.metas.authors,
                  image_url: contribution.metas.image_url || 'http://lorempixel.com/g/350/150/'
                };
                html.push(htmlContribWithMetas(metas));
              } else {
                var noMetas = {
                  title: name,
                  url: '' + html_url.match(/^https:\/\/github.com\/(.*)/)[1]
                };
                html.push(htmlContribNoMetas(noMetas));
              }
              template.folders.html(html.join('\n'));
              template.folders.renderAsync(template.folders._htmlTpl);
            });
          } else {
            var _readmeUrl = { owner: router.params.owner, repo: name, branch: 'master', path: '' + (router.params.path ? router.params.path + '/README.md' : 'README.md') };
            var _ghApiBlob = new GithubUrl(_readmeUrl);
            _ghApiBlob.getMdBlob().then(function (mdResponse) {
              var contribution = new Markdown(mdResponse);
              if (contribution.isMetas()) {
                var metas = {
                  url: '' + html_url.match(/^https:\/\/github.com\/(.*)/)[1],
                  title: contribution.metas.title || name,
                  git_url: html_url,
                  folders: 12,
                  files: 5,
                  contributors: contribution.metas.contributors,
                  description: 'Lorem ipsum',
                  image_url: '' || 'http://lorempixel.com/g/350/150/'
                };
                html.push(htmlFolderWithMetas(metas));
              } else {
                var noMetas = {
                  title: name,
                  url: '' + html_url.match(/^https:\/\/github.com\/(.*)/)[1]
                };
                html.push(htmlFolderNoMetas(noMetas));
              }
              template.folders.html(html.join('\n'));
              template.folders.renderAsync(template.folders._htmlTpl);
            });
          }
        });
      });
    };
  })();
}
'use strict';

{
  (function () {
    var htmlWithMetas = function htmlWithMetas(_ref) {
      var url = _ref.url;
      var title = _ref.title;
      var folders = _ref.folders;
      var files = _ref.files;
      var contributors = _ref.contributors;
      var git_url = _ref.git_url;
      var image_url = _ref.image_url;
      var description = _ref.description;
      var readme_url = _ref.readme_url;
      return '<article class="gh-list-item gh-type-repo">\n      <h2 class="gh-list-title"><a href="#' + url + '">' + title + '</a></h2>\n      <div class="gh-list-content">\n        <div class="gh-list-meta">\n          <p>Dossiers : ' + folders + ' - Fiches : ' + files + '</p>\n          <p>Contributeurs : ' + contributors + '</p>\n          </p>\n          <p>\n            <a href="' + git_url + '">Voir sur Github</a>\n          </p>\n        </div>\n        <img src="' + image_url + '">\n        <p class="gh-list-excerpt">' + description + '</p>\n        <a class="gh-list-readmore"\n            title="Lire la suite de la fiche Titre de la fiche"\n            href="#' + readme_url + '">Lire la présentation complète</a>\n      </div>\n    </article>';
    };

    var htmlNoMetas = function htmlNoMetas(_ref2) {
      var url = _ref2.url;
      var title = _ref2.title;
      return '<article class="gh-list-item gh-type-repo">\n      <h2 class="gh-list-title"><a href="#' + url + '">' + title + '</a></h2>\n    </article>';
    };

    template.repos = new Template('repos');
    template.repos.data = function () {
      var ghApi = new GithubUrl(router.params);
      var html = [];
      ghApi.getJsonRepo().then(function (jsonResponse) {
        jsonResponse.map(function (_ref3) {
          var name = _ref3.name;
          var type = _ref3.type;
          var html_url = _ref3.html_url;
          var url = _ref3.url;

          var readmeUrl = { owner: router.params.owner, repo: name, branch: 'master', path: 'README.md' };
          var ghApiBlob = new GithubUrl(readmeUrl);
          ghApiBlob.getMdBlob().then(function (mdResponse) {
            var contribution = new Markdown(mdResponse);
            if (contribution.isMetas()) {
              var metas = {
                url: html_url.replace('https://github.com/', ''),
                git_url: html_url,
                readme_url: html_url.replace('https://github.com/', '') + '/blob/master/README.md',
                title: contribution.metas.title,
                image_url: contribution.metas.image_url || 'http://lorempixel.com/g/350/150/',
                description: contribution.metas.description,
                contributors: contribution.metas.contributors,
                folders: contribution.metas.folders,
                files: contribution.metas.files
              };
              html.push(htmlWithMetas(metas));
            } else {
              var noMetas = {
                url: html_url.replace('https://github.com/', ''),
                title: name
              };
              html.push(htmlNoMetas(noMetas));
            }
            template.repos.html(html.join('\n'));
            template.repos.renderAsync(template.repos._htmlTpl);
          });
        });
      });
    };
  })();
}
'use strict';

{
  template.search = new Template('search');
  template.search.data = function () {
    template.search.html('\n      <div class="search-engine">\n        <fieldset>\n          <input id="gh-search" type="text" placeholder="Recherche">\n          <input id="button-gh-search" value="Rechercher" type="submit">\n        </fieldset>\n      </div>\n    ');
    template.search.events({
      'click #button-gh-search': function clickButtonGhSearch() {
        if (document.querySelector('#gh-search').value.length > 2) {
          var userQuery = document.querySelector('#gh-search').value;
          var apiUrl = new GithubUrl(router.params).toGhApiSearch(userQuery);
          router.go(apiUrl.replace('https://api.github.com/', ''));
        }
      },
      'keypress #gh-search': function keypressGhSearch(evt) {
        if (evt.key === 'Enter' && evt.target.value.length > 2) {
          var userQuery = evt.target.value;
          var apiUrl = new GithubUrl(router.params).toGhApiSearch(userQuery);
          router.go(apiUrl.replace('https://api.github.com/', ''));
        }
      }
    });
  };
}
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

{
  (function () {
    var htmlWithMetas = function htmlWithMetas(_ref) {
      var url = _ref.url;
      var title = _ref.title;
      var authors = _ref.authors;
      var prose_url = _ref.prose_url;
      var git_url = _ref.git_url;
      var image_url = _ref.image_url;
      var description = _ref.description;
      return '<article class="gh-list-item gh-type-file">\n       <h2 class="gh-list-title"><a href="#' + url + '">' + title + '</a></h2>\n       <div class="gh-list-content">\n         <div class="gh-list-meta">\n           <p>Créé par : ' + authors + '</p>\n         </div>\n         <img src="' + image_url + '">\n         <p class="gh-list-excerpt">' + description + '</p>\n         <a class="gh-list-readmore"\n           title="Lire la suite de la fiche : $(titre)"\n           href="#' + url + '">Lire la fiche</a>\n       </div>\n     </article>';
    };

    var htmlNoMetas = function htmlNoMetas(_ref2) {
      var url = _ref2.url;
      var title = _ref2.title;
      return '<article class="gh-list-item gh-type-file">\n        <h2 class="gh-list-title"><a href="#' + url + '">' + title + '</a></h2>\n     </article>';
    };

    template.searchList = new Template('searchList');
    template.searchList.data = function () {
      var _router$queries$q$mat = router.queries.q.match(/(.*)\+language:Markdown\+user:([0-9A-Za-z\u00C0-\u017F\-\_\.]*)/);

      var _router$queries$q$mat2 = _slicedToArray(_router$queries$q$mat, 3);

      var req = _router$queries$q$mat2[0];
      var query = _router$queries$q$mat2[1];
      var user = _router$queries$q$mat2[2];

      router.params.owner = user;
      var ghApi = new GithubUrl(router.params);
      var html = [];
      ghApi.getJsonSearch(query).then(function (jsonResponse) {
        jsonResponse.items.map(function (_ref3) {
          var name = _ref3.name;
          var path = _ref3.path;
          var html_url = _ref3.html_url;
          var repository = _ref3.repository;

          var readmeUrl = { owner: router.params.owner, repo: repository.name, branch: 'master', path: path };
          var ghApiBlob = new GithubUrl(readmeUrl);
          ghApiBlob.getMdBlob().then(function (mdResponse) {
            var contribution = new Markdown(mdResponse);
            if (contribution.isMetas()) {
              var metas = {
                prose_url: ('http://prose.io/#' + html_url.match(/^https:\/\/github.com\/(.*)/)[1]).replace('blob', 'edit'),
                git_url: html_url,
                url: repository.full_name + '/blob/master/' + path,
                description: contribution.metas.description,
                title: contribution.metas.title,
                authors: contribution.metas.contributors,
                image_url: contribution.metas.image_url || 'http://lorempixel.com/g/350/150/'
              };
              html.push(htmlWithMetas(metas));
            } else {
              var noMetas = {
                title: name,
                url: repository.full_name + '/blob/master/' + path
              };
              html.push(htmlNoMetas(noMetas));
            }
            template.searchList.html(html.join('\n'));
            template.searchList.renderAsync(template.searchList._htmlTpl);
          });
        });
      });
    };
  })();
}

