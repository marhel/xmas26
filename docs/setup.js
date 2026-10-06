// More info about initialization & config:
// - https://revealjs.com/initialization/
// - https://revealjs.com/config/
Reveal.initialize({
  hash: true,
  tagteam: {
      mandatorygroup: true,
      dateFilter: window.location.hostname != "allt.localhost",
      groups: {
        "init": {tags: ["dec-9"]},
        "1f3f7b": {tags: ["dec01"]},
        "223cf7": {tags: ["dec02"]},
        "c2be05": {tags: ["dec03"]},
        "2d4508": {tags: ["dec04"]},
        "26b11d": {tags: ["dec05"]},
        "830f44": {tags: ["dec06"]},
        "d22c3b": {tags: ["dec07"]},
        "05a4c7": {tags: ["dec08"]},
        "afab55": {tags: ["dec09"]},
        "27c2c0": {tags: ["dec10"]},
        "91a2fa": {tags: ["dec11"]},
        "827d37": {tags: ["dec12"]},
        "5ea156": {tags: ["dec13"]},
        "aca785": {tags: ["dec14"]},
        "3887c2": {tags: ["dec15"]},
        "ee8b29": {tags: ["dec16"]},
        "99dcd6": {tags: ["dec17"]},
        "d46266": {tags: ["dec18"]},
        "75d126": {tags: ["dec19"]},
        "804d47": {tags: ["dec20"]},
        "9c5d28": {tags: ["dec21"]},
        "2c133c": {tags: ["dec22"]},
        "75da2f": {tags: ["dec23"]},
        "90fa76": {tags: ["dec24"]},
        "tuttifrutti": {tags: ["dec24"]}
      }
    },
  dependencies: [{ src: 'assets/reveal.js/plugin/external/external.js', condition: function() { return !!document.querySelector( '[data-external]' ); } } ],
  plugins: [Tagteam, RevealZoom],
});