/**
 * Layout for manage and display Github repositories.
 *
 */
{
  layout.create('searchList')
  layout.searchList.html(`
  <header>
    <h1>MultiBao</h1>
    <div id="search-engine-wrapper" class="search-engine-wrapper" data-template="search">
    </div>
  </header>
  <aside>
    <h3>Liste des collectifs</h3>
    <div id="gh-crew-list" data-template="crews">
    </div>
  </aside>
  <main>
    <section id="gh-list" class="gh-list" data-template="searchList">
    </section>
  </main>`)
}
