/**
 * Layout for manage and display Github repositories.
 *
 */
layout.folders = new Layout('folders')
layout.folders.html(`
<main class="container">
  <div id="breadcrumb" class="breadcrumb" data-template="breadcrumb">
  </div>
  <section id="gh-list" class="gh-list" data-template="folders">
  </section>
</main>`)
