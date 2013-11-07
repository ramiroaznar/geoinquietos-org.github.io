/* globals document, $ */
/* exported map */

var map;
(
function () {
    'use strict';

    // Create a vector map
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

    var view = new ol.View2D({
        projection: 'EPSG:4326',
        center: [-10, 5],
        zoom: 2
      });

    map = new ol.Map({
      layers: [vector, markers],
      renderer: ol.RendererHint.CANVAS,
      target: 'map',
      view: view
    });

    // Add a popup
    var element = document.getElementById('popup');

    var popup = new ol.Overlay({
      element: element,
      positioning: ol.OverlayPositioning.BOTTOM_CENTER,
      stopEvent: false
    });
    map.addOverlay(popup);


    map.on('singleclick', function (evt) {
      map.getFeatures({
        pixel: evt.getPixel(),
        layers: [markers],
        success: function (layerFeatures) {
          var feature = layerFeatures[0][0];
          if (feature) {
            $(element).popover('destroy');
            var geometry = feature.getGeometry();
            var coord = geometry.getCoordinates();
            popup.setPosition(coord);
            $(element).popover({
              'placement': 'top',
              'html': true,
              'content': '<a href=\"' + feature.get('web') + '\">' + feature.get('group') + '</a>'
            });
            $(element).popover('show');
          } else {
            $(element).popover('destroy');
          }
        }
      });
    });


    // Animate the map
    $(document).ready(function () {

      var move = function (feature) {
        var pan = ol.animation.pan({
          duration: 2000,
          source: /** @type {ol.Coordinate} */ (view.getCenter())
        });
        map.beforeRender(pan);
        view.setCenter(feature.getGeometry().getCoordinates());
        view.setZoom(4);
      };

      // Get the features

      /* jshint -W106 */
      var features = markers.featureCache_.getFeaturesObject();

      var feature;
      feature = features[187];
      move(feature);
    });
  }()
);
