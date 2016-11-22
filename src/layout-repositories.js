/**
* Layout for manage and display Github repositories.
*
*/
layout.repositories = new Layout('repositories')
layout.repositories.html(`
<main class="container">
  <div id="breadcrumb" class="breadcrumb" data-template="breadcrumb">
  </div>
  <section id="gh-list" class="gh-list" data-template="repositories">
  </section>
</main>`)
