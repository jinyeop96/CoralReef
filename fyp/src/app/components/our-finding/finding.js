var vg_1 = "human.json";
vegaEmbed('#map1', vg_1, {"actions": false}).then(function(result) {
    // Access the Vega view instance (https://vega.github.io/vega/docs/api/view/) as result.view
  }).catch(console.error);

var vg_2 = "ph.json";
vegaEmbed('#map2', vg_2, {"actions": false}).then(function(result) {
    // Access the Vega view instance (https://vega.github.io/vega/docs/api/view/) as result.view
  }).catch(console.error);


var vg_3 = "Temp.json";
vegaEmbed('#map3', vg_3, {"actions": false}).then(function(result) {
    // Access the Vega view instance (https://vega.github.io/vega/docs/api/view/) as result.view
  }).catch(console.error);


var vg_4 = "sal.json";
vegaEmbed('#map4', vg_4, {"actions": false}).then(function(result) {
    // Access the Vega view instance (https://vega.github.io/vega/docs/api/view/) as result.view
  }).catch(console.error);

