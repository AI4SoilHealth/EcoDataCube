import { Overlay } from "ol";
import TileLayer from "ol/layer/Tile";
import VectorImageLayer from "ol/layer/VectorImage";
import { BingMaps, OSM, XYZ } from "ol/source";
import VectorSource from "ol/source/Vector";
import { bbox as bboxStrategy } from 'ol/loadingstrategy.js';
import GeoJSON from 'ol/format/GeoJSON';
import VectorTileLayer from "ol/layer/VectorTile";
import { PMTilesVectorSource } from "ol-pmtiles";
import Style from "ol/style/Style";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import Text from "ol/style/Text";

const nutsStyleCache = {};

const fieldStyleCache = {};

class $map {
  constructor() {
    this.instance = null;
    this.ol3D = null;
  }


  generateBaseMaps(active) {
    return [
      new TileLayer({
        name: 'osm',
        zIndex: 1,
        preload: Infinity,
        
        source: new OSM({
          transition: 0
        }),
        visible: 'osm' === active
      }),
      new TileLayer({
        name: 'osm_gray',
        zIndex: 1,
        preload: Infinity,
        className: 'ol-layer ol-grayscale',
        source: new OSM({
          transition: 0

        }),
        visible: 'osm_gray' === active
      })

      ,
      new TileLayer({
        name: 'bing',
        zIndex: 1,
        preload: Infinity,
        source: new BingMaps({
          key: 'Am5pr8Q-dkmubEMkSwAsIfSkH8UrJjTHt-rMwQUfjjaG5ioU5prI9XSVfT9hjA8G',
          imagerySet: 'AerialWithLabels',
          transition: 0

          // hidpi: OL_HAS.DEVICE_PIXEL_RATIO >= 2
        }),
        visible: 'bing' === active
      }),
      new TileLayer({
        name: 'otm',
        className: 'ol-layer ol-grayscale',
        zIndex: 1,
        preload: Infinity,
        source: new XYZ({
          url: 'https://a.tile.opentopomap.org/{z}/{x}/{y}.png',
          crossOrigin: 'anonymous',
          transition: 0

        }),
        visible: 'otm' === active
      }),
    ]
  }

  createOverlay(elem) {
    let el = new Image();
    el.src = "/pinicon.svg";
    el.className = "pin-icon-container";

    return new Overlay({
      position: null,
      positioning: 'bottom-center',
      element: el,
      offset: [0, 4],
      stopEvent: false
    })
  }

  generateVectorLayers = (active) => {
    return [
      new VectorImageLayer({
        name: 'nuts',
        zIndex: 3,
        visible: active === 'nuts',
        style: (feature) => {
          if (nutsStyleCache[feature.get('NUTS_ID')]) {
            return nutsStyleCache[feature.get('NUTS_ID')];
          }
          else {
            nutsStyleCache[feature.get('NUTS_ID')] = new Style({
              fill: new Fill({
                color: 'transparent',
              }),
              stroke: new Stroke({
                color: '#EB4850',
                width: 2
              }),
              text: new Text({
                text: feature.get('NAME_LATN'),
                fill: new Fill({
                  color: '#EB4850'
                }),
                font: 'bold 14px Calibri,sans-serif',

                justify: 'center'
              })
            })
            return nutsStyleCache[feature.get('NUTS_ID')];
          }

        },
        source: new VectorSource({
          format: new GeoJSON(),
          url: function (extent) {
            return (
              'https://geoserver.earthmonitor.org/geoserver/oem/wfs?' +
              'version=2.0.0' +
              '&service=WFS' +
              '&request=GetFeature' +
              '&typeName=oem:NUTS_RG_01M_2021_3035' +
              '&outputFormat=application/json' +
              '&srsname=EPSG:3857' +
              '&bbox=' + extent.join(',') + ' ,EPSG:3857'
            );
          },
          strategy: bboxStrategy
        })
      }),

      new VectorTileLayer({
        name: 'field',
        zIndex: 3,
        declutter: true,
        visible: active === 'field',
        source: new PMTilesVectorSource({
          url: 'https://s3.ecodatacube.eu/arco/field_boundaries_v2.pmtiles'
        }),
        style: (feature) => {
          if (fieldStyleCache[feature.get('id')]) {
            return fieldStyleCache[feature.get('id')];
          } else {
            fieldStyleCache[feature.get('id')] = new Style({
              fill: new Fill({
                color: 'transparent',
              }),
              stroke: new Stroke({
                color: '#EB4850',
                width: 2
              }),
            })

            return fieldStyleCache[feature.get('id')];
          }

        },
      })
    ]
  }

  setBase(base, list) {
    list.forEach(layer => {
      if (layer.get('name') === base) {
        layer.setVisible(true);
      } else {
        layer.setVisible(false);
      }
    });
  }

  generateLayers(layers) {
    return layers.map(l => l.tileLayer)
  }

  setLayer(layer, list, layerObj) {
    list.forEach(l => {
      if (l.get('name') === layer) {

        if (layerObj.depths.length > 0) {
          this.setBoth(layerObj.defaultTime, layerObj.defaultDepth, layerObj);
        } else {
          this.setTime(layerObj.defaultTime, layerObj);
        }
        l.setVisible(true);
      } else {
        l.setVisible(false);
      }
    });
  }

  setVector(vector, list) {
    list.forEach(layer => {
      if (layer.get('name') === vector) {
        layer.setVisible(true);
      } else {
        layer.setVisible(false);
      }
    });
  }

  setTime(time, layerObj) {
    layerObj.tileLayer.getSource().updateParams({
      [layerObj.timeDimension]: time
    })
  }

  setDepth(depth, layerObj) {
    layerObj.tileLayer.getSource().updateParams({
      [layerObj.depthDimension]: depth
    })
  }

  setBoth(time, depth, layerObj) {
    layerObj.tileLayer.getSource().updateParams({
      [layerObj.timeDimension]: time,
      [layerObj.depthDimension]: depth
    })
  }

  setOpacity(opacity, list) {
    list.forEach(layer => {
      layer.setOpacity(opacity / 100);
    });
  }
}

export default new $map();