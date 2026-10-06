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
        "kod01": {tags: ["dec01"]},
        "kod02": {tags: ["dec02"]},
        "kod03": {tags: ["dec03"]},
        "kod04": {tags: ["dec04"]},
        "kod05": {tags: ["dec05"]},
        "kod06": {tags: ["dec06"]},
        "kod07": {tags: ["dec07"]},
        "kod08": {tags: ["dec08"]},
        "kod09": {tags: ["dec09"]},
        "kod10": {tags: ["dec10"]},
        "kod11": {tags: ["dec11"]},
        "kod12": {tags: ["dec12"]},
        "kod13": {tags: ["dec13"]},
        "kod14": {tags: ["dec14"]},
        "kod15": {tags: ["dec15"]},
        "kod16": {tags: ["dec16"]},
        "kod17": {tags: ["dec17"]},
        "kod18": {tags: ["dec18"]},
        "kod19": {tags: ["dec19"]},
        "kod20": {tags: ["dec20"]},
        "kod21": {tags: ["dec21"]},
        "kod22": {tags: ["dec22"]},
        "kod23": {tags: ["dec23"]},
        "kod24": {tags: ["dec24"]},
        "tuttifrutti": {tags: ["dec24"]}
      }
    },
  dependencies: [{ src: 'assets/reveal.js/plugin/external/external.js', condition: function() { return !!document.querySelector( '[data-external]' ); } } ],
  plugins: [Tagteam, RevealZoom],
});