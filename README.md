# An idiots budget (Dokumentation):

## Interna filer (filer som hör till mitt projekt, skapade av mig)

- index.html = Filen som drar igång hela applikationen med stilmallar osv

- internal/css/default.css = Default-stilmall för hela projektet

- internal/javascript/master.js = Fil som laddar in alla beroende bibliotek, egna filer osv

- internal/javascript/collections/collection_budget_posts.js = Klass för hantering av lagringen av modeller

- internal/javascript/models/model_budget_post.js = Klass för hantering av en modell med budgetinnehåll

- internal/javascript/routers/router_master.js = Klass för hantering av url:er och dylikt för hela applikationen

- internal/javascript/views/view_budget_post.js = Klass för hantering av en modells utskrift i vyn

- internal/javascript/views/view_start.js = Klass för utskrift av hela gränssnittet utom enskilda modeller

## Externa filer (filer som hör till mitt projekt, skapade av andra)

- external/css/apprise/apprise.css = Stilmall för dialogrutorna, som biblioteket apprise skapar

- external/javascript/libs/apprise/apprise.js = Bibliotek för apprise (dialogrutor: alert osv)

- external/javascript/libs/backbone/backbone.js = Bibliotek för backbone

- external/javascript/libs/backbone/backbone.localStorage.js = Localstorage-plugin för backbone 

- external/javascript/libs/bluff/bluff.js = Bibliotek för utskrift av diagrammet

- external/javascript/libs/bluff/js-class.js = Fil/klass som behövs av bluff för att kunna fungera

- external/javascript/libs/headjs/head.js = Bibliotek för hantering av inkluderingen av filer

- external/javascript/libs/jquery/jquery.js = Bibliotek för jquery

- external/javascript/libs/underscore/underscore.js = Bibliotek för jquery

## Att fixa med (för den som vill)

- Bättre validering av input-data

- Skriv-ut knapp för att skriva ut viktiga delar av applikationen (som diagram och tillhörande tabell-rader)

- Eventuella buggar ni hittar!

- Paging för tabell-rader

- Något annat som ni ser behöver fixas med…

## Test av applikationen

Denna hittas på adressen: http://jensevertsson.nu/budget