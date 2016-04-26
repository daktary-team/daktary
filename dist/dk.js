'use strict';

var GH_SECRET = 'M2NmYjI1YmNlOWE4MGFjN2E2NzIxZTg5YzkwMGVhZjM5NzEwN2Y2MA==';
var GH_ID = 'NGEzOWM4YzE4NjA3NDkxNWU1NDY=';

var CREWS = { crews: [{ title: 'Bienvenue sur multiBàO',
    label: 'Accueil Multibao',
    owner: 'multibao'
  }, {
    title: 'Réseau Transition BE',
    label: 'Réseau Transition BE',
    owner: 'reseautransitionwb'
  }, {
    title: 'Réseau Coop-tic',
    label: 'Coop-TIC',
    owner: 'supagroflorac'
  }, {
    title: 'Traducteurs agiles',
    label: 'Traducteurs agiles',
    owner: 'les-traducteurs-agiles'
  }, {
    title: 'Onpassealacte',
    label: 'Onpassealacte',
    owner: 'onpassealacte'
  }] };
/**
   * An object to manage Github url.
   *
   * @param {String} An HTML string reprsenting a github Url.
   *
   */
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var GithubUrl = (function () {
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
  }]);

  return GithubUrl;
})();
/**
   * A Router to manage client side url.
   *
   * @param {String} An HTML string reprsenting an arguments
   * and queries option Url.
   *
   */
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Router = (function () {
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
    key: '_setQueries',
    value: function _setQueries() {
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
      var paramsName = pattern.split('/');
      var paramsValue = this._urlWithoutParams().split('/');
      for (var index in paramsName) {
        // Store all remain values
        if (paramsName[index].match(/\(\.\*\)/)) {
          this.params[paramsName[index].match(/^:(\w+)/)[1]] = paramsValue.slice(index).join('/')
          // Store single value
          ;
        } else if (paramsName[index].match(/^:/)) {
          this.params[paramsName[index].match(/^:(\w+)/)[1]] = paramsValue[index];
        }
      }
    }
  }, {
    key: '_patternToRegex',
    value: function _patternToRegex(pattern) {
      var regex = [];
      regex.push('^');
      pattern.split('/').map(function (patternItem) {
        // Capture a parameter
        if (patternItem.match(/^:/)) {
          var regTmp = '[0-9A-Za-zÀ-ſ-_.]*';
          // Capture all the parameters
          if (patternItem.match(/\(\.\*\)$/)) {
            regTmp = '[0-9A-Za-zÀ-ſ-_./]*';
          }
          // Capture optional parameters
          if (patternItem.match(/\?$/)) {
            regex.pop();
            regTmp = '(/[0-9A-Za-zÀ-ſ-_./]*|)';
          }
          regex.push(regTmp);
        } else {
          // Capture a fixed parameter
          regex.push(patternItem);
        }
        regex.push('/');
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
          this._setQueries();route.action.bind(this)();
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
      this.url = url;
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
})();
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Lyt = (function () {
  function Lyt() {
    _classCallCheck(this, Lyt);

    this._htmlTpl = '';
  }

  _createClass(Lyt, [{
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

  return Lyt;
})();

var Layout = (function () {
  function Layout() {
    _classCallCheck(this, Layout);
  }

  _createClass(Layout, [{
    key: 'create',
    value: function create(name) {
      this[name] = new Lyt();
    }
  }]);

  return Layout;
})();
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _slicedToArray(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Tpl = (function () {
  function Tpl(name) {
    _classCallCheck(this, Tpl);

    this._htmlTpl = '';
    this._name = name;
    this._events = {};
    this.data = function () {};
  }

  _createClass(Tpl, [{
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

      var _loop = function (_event) {
        var _event$split = _event.split(' ');

        var _event$split2 = _slicedToArray(_event$split, 2);

        var evtType = _event$split2[0];
        var evtSelector = _event$split2[1];

        var func = _this._events[_event];
        clone.querySelector(evtSelector).addEventListener(evtType, function (evt) {
          return func(evt);
        });
      };

      for (var _event in this._events) {
        _loop(_event);
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

  return Tpl;
})();

var Template = (function () {
  function Template() {
    _classCallCheck(this, Template);
  }

  _createClass(Template, [{
    key: 'create',
    value: function create(name) {
      this[name] = new Tpl(name);
    }
  }]);

  return Template;
})();
'use strict';

window.addEventListener('hashchange', function () {
  return window.location.reload(true);
});
window.addEventListener('load', function () {
  var ghUrl = window.location.toString().split('#')[1] || 'multibao/contributions/tree/master/pages';
  router.go(ghUrl);
  if (router.isNoRoute()) {
    window.location = './404.html';
  }
});
var template = new Template();
var layout = new Layout();
/**
* Layout for manage and display Github contribution.
*
*/
'use strict';

{
  layout.create('viewer');
  layout.viewer.html('\n  <main>\n    <div id="parentRepo" class="breadcrumbs" data-template="parentRepo">\n    </div>\n    <article data-template="contribution" id="contribution">\n    </article>\n  </main>\n  ');
}
/**
 * Layout for manage and display Github repositories.
 *
 */
'use strict';

{
  layout.create('folders');
  layout.folders.html('\n  <header>\n    <h1>MultiBao</h1>\n    <div id="search-engine-wrapper" class="search-engine-wrapper" data-template="search">\n    </div>\n  </header>\n  <aside>\n    <h3>Liste des collectifs</h3>\n    <div id="gh-crew-list" data-template="crews">\n    </div>\n  </aside>\n  <main>\n    <div id="breadcrumb" class="breadcrumb" data-template="breadcrumb">\n    </div>\n    <section id="gh-list" class="gh-list" data-template="folders">\n    </section>\n  </main>');
}
/**
 * Layout for manage and display Github repositories.
 *
 */
'use strict';

{
  layout.create('repos');
  layout.repos.html('\n  <header>\n    <h1>MultiBao</h1>\n    <div id="search-engine-wrapper" class="search-engine-wrapper" data-template="search">\n    </div>\n  </header>\n  <aside>\n    <h3>Liste des collectifs</h3>\n    <div id="gh-crew-list" data-template="crews">\n    </div>\n  </aside>\n  <main>\n    <div id="breadcrumb" class="breadcrumb" data-template="breadcrumb">\n    </div>\n    <section id="gh-list" class="gh-list" data-template="repos">\n    </section>\n  </main>');
}
/**
 * Layout for manage and display Github repositories.
 *
 */
'use strict';

{
  layout.create('searchList');
  layout.searchList.html('\n  <header>\n    <h1>MultiBao</h1>\n    <div id="search-engine-wrapper" class="search-engine-wrapper" data-template="search">\n    </div>\n  </header>\n  <aside>\n    <h3>Liste des collectifs</h3>\n    <div id="gh-crew-list" data-template="crews">\n    </div>\n  </aside>\n  <main>\n    <section id="gh-list" class="gh-list" data-template="searchList">\n    </section>\n  </main>');
}
// Create a router
'use strict';

var router = new Router();

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
  template.create('contribution');

  template.contribution.data = function () {
    var apiUrl = new GithubUrl(router.params).toGhApiUrl();
    fetch(apiUrl, { headers: { Accept: 'application/vnd.github.v3.html' } }).then(function (response) {
      return response.text();
    }).then(function (html) {
      template.contribution.html(html);
      template.contribution.renderAsync();
    });
  };
}
'use strict';

{
  template.create('parentRepo');

  template.parentRepo.data = function () {
    var _router$params = router.params;
    var owner = _router$params.owner;
    var repo = _router$params.repo;
    var branch = _router$params.branch;
    var path = _router$params.path;
    var _link$label = {
      link: '#' + owner + '/' + repo + '/tree/' + branch + '/' + ('' + path.replace(/(\/|)[0-9A-Za-z\u00C0-\u017F\-\_\.]*$/, '')),
      label: '' + owner + ' - ' + repo
    };
    var link = _link$label.link;
    var label = _link$label.label;

    template.parentRepo.html('À retrouver dans le dépôt : <a href="' + link + '">' + label + '</a>');
  };
}
/**
* Add selected in current crew and return the crews list.
*
* @param {String} An HTML string representing a github Url contribution.
* @result {Array} A array with each crew Object.
*/
'use strict';

var crewsWithSelectedClass = function crewsWithSelectedClass(owner, crews) {
  return crews.map(function (elt) {
    if (elt.owner === owner) {
      elt.classAttr = 'selected';
    }
    return elt;
  });
};
template.create('crews');
template.crews.data = function () {
  var ownerRoute = router.params.owner;
  var _crews = { crews: crewsWithSelectedClass(ownerRoute, CREWS.crews) };
  var crews = _crews.crews;

  template.crews.html('<ul>' + crews.map(function (_ref) {
    var title = _ref.title;
    var repo = _ref.repo;
    var label = _ref.label;
    var link = _ref.link;
    var owner = _ref.owner;
    var classAttr = _ref.classAttr;
    return '<li><a title="' + title + '" class="' + classAttr + '" href="#' + owner + '"' + (' data-owner="' + owner + '">' + label + '</a></li>');
  }).join('\n') + '</ul>');
};
'use strict';

{
  template.create('search');

  template.search.data = function () {
    template.search.html('\n      <h2>Recherche</h2>\n      <div class="search-engine">\n        <fieldset>\n          <input id="gh-search" type="text">\n          <input id="button-gh-search" value="Rechercher" type="submit">\n        </fieldset>\n      </div>\n    ');
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

{
  template.create('breadcrumb');

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
            link: '#' + owner + '/' + repo + '/tree/' + branch + '' + pathByFolder.join(''),
            label: elt
          });
        });
      })();
    }
    var _ownerTpl$repoTpl$foldersTpl = {
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
    var ownerTpl = _ownerTpl$repoTpl$foldersTpl.ownerTpl;
    var repoTpl = _ownerTpl$repoTpl$foldersTpl.repoTpl;
    var foldersTpl = _ownerTpl$repoTpl$foldersTpl.foldersTpl;

    template.breadcrumb.html('<ul>\n        <li><a href="/">Accueil</a></li>\n        <li><a href="' + ownerTpl.link + '">' + ownerTpl.label + '</a></li>\n        ' + (repoTpl.label ? '<li><a href="' + repoTpl.link + '">' + repoTpl.label + '</a></li>' : '') + foldersTpl.map(function (folder) {
      return '<li><a href="' + folder.link + '">' + folder.label + '</a></li>';
    }).join('\n') + '</ul>');
  };
}
'use strict';

{
  template.create('folders');

  template.folders.data = function () {
    var apiUrl = new GithubUrl(router.params).toGhApiUrl();
    fetch(apiUrl, { headers: { Accept: 'application/vnd.github.v3' } }).then(function (response) {
      return response.json();
    }).then(function (json) {
      var ressources = json.map(function (_ref) {
        var name = _ref.name;
        var type = _ref.type;
        var html_url = _ref.html_url;
        return {
          name: name,
          type: type,
          prose_url: ('http://prose.io/#' + html_url.match(/^https:\/\/github.com\/(.*)/)[1]).replace('blob', 'edit'),
          git_url: html_url,
          url: '' + html_url.match(/^https:\/\/github.com\/(.*)/)[1]
        };
      });
      template.folders.html(ressources.map(function (_ref2) {
        var type = _ref2.type;
        var name = _ref2.name;
        var url = _ref2.url;
        var prose_url = _ref2.prose_url;
        var git_url = _ref2.git_url;
        return '<article class="gh-list-item gh-type-' + type + '">\n              <h2 class="gh-list-title"><a href="#' + url + '">' + name + '</a></h2>\n              <div class="gh-list-meta">\n                <p>Mis à jour : 02/02/16</p>\n                <p>Créé par : <a href="">pntbr</a> / Contributeurs les plus actifs :\n                  <a href="">pntbr</a> / <a href="">wolffgang</a>\n                </p>\n                <p>\n                 ' + (type === 'file' ? '<a href="' + prose_url + '">Editer la fiche</a> - ' : '') + '\n                 <a href="' + git_url + '">Voir sur Github</a>\n                </p>\n              </div>\n              <!--si <image--></image-->\n              <img src="http://placehold.it/350x150">\n              <!--/si image-->\n              <p class="gh-list-excerpt">Le début de la fiche qui parle de ...</p>\n              <a class="gh-list-readmore"\n                title="Lire la suite de la fiche Titre de la fiche"\n                href="' + url + '">Lire la fiche</a>\n            </article>';
      }).join('\n'));
      template.folders.renderAsync(template.folders._htmlTpl);
    });
  };
}
'use strict';

{
  template.create('repos');

  template.repos.data = function () {
    var apiUrl = new GithubUrl(router.params).toGhRepoApiUrl();
    fetch(apiUrl, { headers: { Accept: 'application/vnd.github.v3' } }).then(function (response) {
      return response.json();
    }).then(function (json) {
      var ressources = json.map(function (_ref) {
        var name = _ref.name;
        var type = _ref.type;
        var html_url = _ref.html_url;
        return {
          name: name,
          type: type,
          git_url: html_url,
          url: '' + html_url.match(/^https:\/\/github.com\/(.*)/)[1]
        };
      });
      template.repos.html(ressources.map(function (_ref2) {
        var name = _ref2.name;
        var url = _ref2.url;
        var git_url = _ref2.git_url;
        return '<article class="gh-list-item gh-type-repo">\n               <h2 class="gh-list-title"><a href="#' + url + '">' + name + '</a></h2>\n               <div class="gh-list-meta">\n                 <p>Mis à jour : 02/02/16</p>\n                 <p>Créé par : <a href="">pntbr</a> / Contributeurs les plus actifs :\n                   <a href="">pntbr</a> / <a href="">wolffgang</a>\n                 </p>\n                 <p>\n                   <a href="' + git_url + '">Voir sur Github</a>\n                 </p>\n               </div>\n               <!--si <image--></image-->\n                 <img src="http://placehold.it/350x150">\n               <!--/si image-->\n               <p class="gh-list-excerpt">Le début de la fiche qui parle de ...</p>\n               <a class="gh-list-readmore"\n                  title="Lire la suite de la fiche Titre de la fiche"\n                  href="' + url + '">Lire la fiche</a>\n             </article>';
      }).join('\n'));
      template.repos.renderAsync(template.repos._htmlTpl);
    });
  };
}
'use strict';

function _slicedToArray(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }

{
  template.create('searchList');

  template.searchList.data = function () {
    var _router$queries$q$match = router.queries.q.match(/(.*)\+language:Markdown\+user:([0-9A-Za-z\u00C0-\u017F\-\_\.]*)/);

    var _router$queries$q$match2 = _slicedToArray(_router$queries$q$match, 3);

    var req = _router$queries$q$match2[0];
    var query = _router$queries$q$match2[1];
    var user = _router$queries$q$match2[2];

    router.params.owner = user;
    var apiUrl = new GithubUrl(router.params).toGhApiSearch(query);
    fetch(apiUrl, { headers: { Accept: 'application/vnd.github.v3.html' } }).then(function (response) {
      return response.json();
    }).then(function (json) {
      var ressources = json.items.map(function (_ref) {
        var name = _ref.name;
        var type = _ref.type;
        var path = _ref.path;
        var html_url = _ref.html_url;
        var repository = _ref.repository;
        return {
          name: name,
          type: type,
          prose_url: ('http://prose.io/#' + html_url.match(/^https:\/\/github.com\/(.*)/)[1]).replace('blob', 'edit'),
          git_url: html_url,
          url: '' + repository.full_name + '/blob/master/' + path
        };
      });
      template.searchList.html(ressources.map(function (_ref2) {
        var type = _ref2.type;
        var name = _ref2.name;
        var url = _ref2.url;
        var prose_url = _ref2.prose_url;
        var git_url = _ref2.git_url;
        return '<article class="gh-list-item gh-type-' + type + '">\n              <h2 class="gh-list-title"><a href="#' + url + '">' + name + '</a></h2>\n              <div class="gh-list-meta">\n                <p>Mis à jour le : 02/02/16</p>\n                <p>Créé par : <a href="">pntbr</a> / Contributeurs les plus actifs :\n                  <a href="">pntbr</a> / <a href="">wolffgang</a>\n                </p>\n                <p>\n                 ' + (type === 'file' ? '<a href="' + prose_url + '">Editer la fiche</a> - ' : '') + '\n                 <a href="' + git_url + '">Voir sur Github</a>\n                </p>\n              </div>\n              <!--si <image--></image-->\n              <img src="http://placehold.it/350x150">\n              <!--/si image-->\n              <p class="gh-list-excerpt">Le début de la fiche qui parle de ...</p>\n              <a class="gh-list-readmore"\n                title="Lire la suite de la fiche Titre de la fiche"\n                href="' + url + '">Lire la fiche</a>\n            </article>';
      }).join('\n'));
      template.searchList.renderAsync(template.searchList._htmlTpl);
    });
  };
}

