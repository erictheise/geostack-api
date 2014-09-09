var express = require('express');
var router = express.Router();
var pg = require('pg');
var tags = {};

router.get('/', function(req, res) {
  getAmenities(req.body, res);
});

function getAmenities(amenities, res) {
  var conString = "pg://localhost/portland_from_osm";
  var client = new pg.Client(conString);
  client.connect();

  var fc = {
    "type": "FeatureCollection",
    "features": []
  };

  var sql = "SELECT name, ST_AsGeoJSON(ST_TRANSFORM(way, 4326)) AS way, tags->'cuisine' AS cuisine " +
    "FROM planet_osm_point " +
    "WHERE amenity = 'restaurant' AND name IS NOT NULL;";

  client.query(sql, function(err, result) {
    result.rows.forEach(function(feature){

      tags = feature.tags;

      var f = {
        "type": "Feature",
        "geometry": JSON.parse(feature.way),
        "properties": {
          "name": feature.name,
          "cuisine": feature.cuisine
        }
      };
      fc.features.push(f);
    });

    res.setHeader("Access-Control-Allow-Origin", "*")
    res.send(fc);
  });

}

module.exports = router;

