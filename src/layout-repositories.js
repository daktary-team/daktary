/**
 * Layout for manage and display Github repositories.
 *
 */
{
  layout.create('repos')
  layout.repos.html(`
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
    <div id="breadcrumb" class="breadcrumb" data-template="breadcrumb">
    </div>
    <section id="gh-list" class="gh-list" data-template="repos">
    </section>
  </main>`)
}
