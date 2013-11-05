/*globals document:false, window:false*/
var map;
(function () {
    'use strict';

    var vector = new ol.layer.Vector({
      source: new ol.source.Vector({
        url: '/assets/data/world-110m.json',
        parser: new ol.parser.TopoJSON()
      }),
      style: new ol.style.Style({
        symbolizers: [
          new ol.style.Fill({
            color: '#95a5a6',
            opacity: 0.5
          }),
          new ol.style.Stroke({
            color: '#ecf0f1',
            opacity: 1,
            width: 1.5
          })
        ]
      })
    });

    var markers = new ol.layer.Vector({
      source: new ol.source.Vector({
        parser: new ol.parser.GeoJSON(),
        url: '/assets/data/geoinquietos.json'
      }),
      style: new ol.style.Style({
          symbolizers: [
            new ol.style.Icon({
              url: '/assets/images/icon.png',
              yOffset: -22
            })
          ]
        })
    });

    map = new ol.Map({
      layers: [vector,markers],
      renderer: ol.RendererHint.CANVAS,
      target: 'map',
      view: new ol.View2D({
        projection: 'EPSG:4326',
        center: [-10, 5],
        zoom: 2
      })
    });

    
    $(document).ready(function () {
        // add active class to the current nav bar item if found
        $('a[href=\"' + window.location.pathname + '\" ]').parent().addClass('active');
    });
}());
