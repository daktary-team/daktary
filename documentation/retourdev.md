# Retours sur dev.multibao.org

Tests semaine du 4 au 10 avril 2016

### Relatif à la lecture des fiches 

Fonctionnalité testée     |   Retours
--------|------
Lire une fiche en markdown  |   Ok, sauf si nom fichier ne respectant pas la charte de nommage
Lire une fiche en yml, css  |   Ok, sauf si nom fichier ne respectant pas la charte de nommage

## Relatifs à la création et modifications de ressources

Fonctionnalité testée     |   Retours
--------|------
Editer une fiche   |   Ok
Editer une fiche via prose.io  |   Ok
Editer une fiche: mettre en forme le texte  |   Ok
Editer une fiche: insérer une image en hypertexte  |   Ok
Editer une fiche: insérer une image via prose.io  |   L'image n'est pas affichée. Le {{site.baseurl}} lié à l'image n'est pas reconnu lors l'incorporation de la photo. L'image n'est pas affichée. Je cherche pourquoi.
Editer une fiche: renseigner les metadatas  |   Ok. Top: n'apparaissent plus dans la lecture de la fiche sur multibao.org
Editer une fiche: renseigner des notes de bas de page  |  Page d'erreur 404. Les notes renvoient vers dev.multibao.org/#note qui renvoie vers une page d'erreur 404.
Editer une fiche: commiter  |   Ok

## Relatifs à l'utilsateur du routeur

En renseignant [...] dans la barre hypertexte      |   j'obtiens le résultat suivant
--------|------
http://multibao.org/#**orga/repo**/tree/master  |    Architecture "vide" de dev.multibao.org. Fonctionne pour les repos spécifiés par daktary. Je continue de chercher pourquoi.
http://multibao.org/#**user/repo**/tree/master  |    Architecture "vide" de dev.multibao.org, comme en démo: dev.multibao.org/#alecoz/democracy-story/tree/master
http://multibao.org/#**orga/repo**/tree/master/**dossier**  |    Architecture "vide" de dev.multibao.org, comme en démo: http://dev.multibao.org/#alecoz/democratie_ouverte/tree/master/contributions; la liste des fiches n'apparait pas
http://multibao.org/#**user/repo**/tree/master/**dossier**  |    Architecture "vide" de dev.multibao.org
http://multibao.org/#**orga/repo**/tree/master/**nomfiche.md**  |    Fonctionnel
http://multibao.org/#**user/repo**/tree/master/**nomfiche.md**  |    Fonctionnel
http://multibao.org/#**orga/repo**/tree/master/**dossier/nomfiche.md** |    Fonctionnel
http://multibao.org/#**user/repo**/tree/master/**dossier/nomfiche.md**  |    Fonctionnel
http://multibao.org/#**orga/repo**/tree/master/**dossier/dossier/nomfiche.md** |    Redirige parfois vers une page 404., comme en démo: dev.multibao.org/#multibao/contributions/blob/master/financements/subventions_2016/0-lisez-moi.md.  Je cherche pourquoi.
http://multibao.org/#**user/repo**/tree/master/**dossier/dossier/nomfiche.md**  |    Redirige parfois vers une page 404, mais pas toujours. Je cherche pourquoi.

## Relatifs à la navigation 

Fonctionnalité testée     |   Retours
--------|------
Naviguer dans la partie gauche: ouvrir organisations  |   Ok, sauf si nom de repo ne respectant pas la charte de nommage 
Naviguer dans le breadcrum  |   Pour les orgas spécifiées dans daktary, fonctionne. Pour les orgas et fiches testées en les renseignant dans le lien hypertexte, ne fonctionne pas. Démo: http://dev.multibao.org/#scopyleft/trampolean/tree/master/pour-incubateurs/index.html. Voir retours liés au routeur. 
Utiliser le moteur de recherche  |   En cours de tests


## Relatifs aux navigateurs faisant apparaitre http://dev.multibao.org

Navigateurs     |   Retours
--------|------
Firefox 45.0 (Ubuntu)  x5 |   Fonctionnel
Firefox 45.0.1 (Windows) x2 |   Fonctionnel
Firefox 46.0b4 x1 |   Fonctionnel
Internet Explorer v 11.162 (Windows) x1 |   Page blanche
Google Chome 49.0.2623.112 (Windows) x2 | Fonctionnel
Google Chome 49.0.2623.110 (Windows) x1 | Fonctionnel
Chrome Version 50.0.2661.49 (Mac) x1 | Fonctionnel
Chromium / Version 49.0.2623.108 (Ubuntu) x1 | Fonctionnel
Chrome 47.0.2526.83 (Android) x1 |   Page blanche
Safari Version 9.1 (10601.5.17.4) x1 |   Page blanche
