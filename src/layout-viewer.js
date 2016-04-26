 /**
 * Layout for manage and display Github contribution.
 *
 */
{
  layout.create('viewer')
  layout.viewer.html(`
  <main>
    <div id="parentRepo" class="parentRepo" data-template="parentRepo">
    </div>
    <aside class="viewer-actions">
      <nav>
        <ul>
          <li><a href="" title="Editer sur prose.io"><img src="../img/font-selection-editor.svg" alt="Editer sur prose.io"></a></li>
          <li><a href="" title="Besoin d'aide ?"><img src="../img/question-sign.svg" alt="Besoin d'aide ?"></a></li>
        </ul>
      </nav>
      <a href="" title="Remonter en haut de la page"><img src="../img/arrow-up.svg" alt="Remonter en haut de la pge"></a>
    </aside>
    <article data-template="contribution" id="contribution">
    </article>
  </main>
  `)
}

