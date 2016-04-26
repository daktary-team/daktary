/**
 * Layout for manage and display Github repositories.
 *
 */
//{
//  layout.create('folders')
//  layout.folders.html(`
//  <header>
//    <h1>MultiBao</h1>
//    <div id="search-engine-wrapper" class="search-engine-wrapper" data-template="search">
//    </div>
//  </header>
//  <aside>
//    <h3>Liste des collectifs</h3>
//    <div id="gh-crew-list" data-template="crews">
//    </div>
//  </aside>
//  <main>
//    <div id="breadcrumb" class="breadcrumb" data-template="breadcrumb">
//    </div>
//    <section id="gh-list" class="gh-list" data-template="folders">
//    </section>
//  </main>`)
//}
{
  layout.create('folders')
  layout.folders.html(`
  <header class="clearfix">
    <h1>multiBàO</h1>
    <div id="search-engine-wrapper" class="search-engine-wrapper" data-template="search">
    </div>
  </header>
  <main>
    <section class="home-intro">
        <h2>Partager en équipe et au monde ses apprentissages sur le faire ensemble</h2>
    </section>
    <section id="gh-crew-list" data-template="crews">
    </section>
  </main>`)
}
