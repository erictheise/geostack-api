# geostack-api

This is a trivial Node/Express application that's used in conjunction with my [Let's Talk About Your
Geostack](http://erictheise.github.io/deck-geo-stack-deep-dive) workshop & deck.

## Requirements

The requirements for this to work are that

  0. you have [Node](http://nodejs.org/) and `npm` installed
  1. there's a spatially-enabled ([PostgreSQL](http://postgresql.org/) + [PostGIS](http://postgis.org/)) database running on `localhost`
  2. the database contains [OpenStreetMap](http://openstreetmap.org/) data, likely a [metro extract](http://mapzen.com/metro-extracts/)
  3. the data import was done with [`osm2pgsql`](https://github.com/openstreetmap/osm2pgsql) and included all tags, meaning
     that `--hstore-all` was used, e.g.

     ```
     osm2pgsql -H localhost --hstore-all -d portland_from_osm ~/Downloads/portland.osm.pbf
     ```

## Motivation

The workshop demonstrates how all components of a contemporary web mapping application can be run locally, on your own
computer, using open source software and open data. OpenStreetMap data is used with [TileMill](http://mapbox.com/tilemill/)
to generate map tiles, as a base layer, and with [Leaflet](http://leafletjs.com) to generate map overlays, for points of interest.

## Use

  1. `git clone` this repository.
  2. `cd geostack-api`
  3. `npm install`
  4. alter line 11 of `/routes/amenities.js` to account for your database name and authentication parameters. The general
     form is

     ```
     pg://user_name:user_password@localhost/database_name
     ```

  5. `npm start`
  6. visit or make an AJAX call to `localhost:3000/amenities/` to retrieve a [GeoJSON](http://geojson.org/geojson-spec.html#examples)
     _FeatureCollection_ of restaurants and their cuisines

```
{
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -123.201866018855,
                    45.2027315841557
                ]
            },
            "properties": {
                "name": "El Primo",
                "cuisine": null
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -123.192975122993,
                    45.2237749069396
                ]
            },
            "properties": {
                "name": "Chan's Restuarant",
                "cuisine": "chinese"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -122.230128012966,
                    45.3831193176103
                ]
            },
            "properties": {
                "name": "Calamity Jane's",
                "cuisine": "burger"
            }
        }
    ]
}
```
