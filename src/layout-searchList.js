/**
* Layout for manage and display Github repositories.
*
*/
layout.searchList = new Layout('searchList')
layout.searchList.html(`
<main class="container">
  <!--
  <section class="search-result search-result-blank">
  il n'y a pas de résultat pour la recherche <span>agilité</span> dans le repo <a href=""> Super repo de démo</a>
  </section>
  <section class="search-result">
    <span>3</span> résultat(s) pour la recherche <span>agilité</span> dans le repo <a href=""> Super repo de démo</a>
  </section>
  -->
  <section id="gh-list" class="gh-list" data-template="searchList">
  </section>
</main>`)
