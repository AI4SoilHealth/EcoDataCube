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
import Circle from "ol/style/Circle";
import Text from "ol/style/Text";
export const cadastreCountries = [
  "lichtenstein",
  "luxembourg",
  "malta",
  "netherlands",
  "portugal",
  "norway",
  "belgium",
  "iceland",
  "estonia",
  "denmark"
]
const nutsStyleCache = {};

const fieldStyleCache = {};
const treeStyleCache = {};
const lcvStyleCache = {};

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
        name: 'esri',
        zIndex: 1,
        preload: Infinity,
        source: new XYZ({
          url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          crossOrigin: 'anonymous',
          transition: 0

        }),
        visible: 'esri' === active
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
                color: '#000',
                width: 1
              }),
              text: new Text({
                text: feature.get('NAME_LATN'),
                fill: new Fill({
                  color: '#000'
                }),
                stroke: new Stroke({
                  color: '#fff',
                  width: 1
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
                color: '#000',
                width: 1
              }),

            })

            return fieldStyleCache[feature.get('id')];
          }

        },
      }),
      new VectorTileLayer({
        name: 'tree',
        zIndex: 3,
        declutter: true,
        visible: active === 'tree',
        source: new PMTilesVectorSource({
          url: 'https://s3.ecodatacube.eu/arco/veg_tree.species_postprocessed.point.samples_eu.pmtiles'
        }),
        style: (feature) => {
          if (treeStyleCache[feature.get('id')]) {
            return treeStyleCache[feature.get('id')];
          } else {
            treeStyleCache[feature.get('id')] = new Style({
              image: new Circle({
                fill: new Fill({
                  color: '#000',
                }),
                stroke: new Stroke({
                  color: '#fff',
                  width: 2
                }),
                radius: 4
              })
            })

            return treeStyleCache[feature.get('id')];
          }

        },
      }),
      new VectorTileLayer({
        name: 'lcv',
        zIndex: 3,
        declutter: true,
        visible: active === 'lcv',
        source: new PMTilesVectorSource({
          url: 'https://s3.ecodatacube.eu/arco/lcv_landcover_lucas.corine.samples_c_30m_0..0cm_2000..2019_eu_v0.1.pmtiles'
        }),
        style: (feature) => {
          if (lcvStyleCache[feature.get('id')]) {
            return lcvStyleCache[feature.get('id')];
          } else {
            lcvStyleCache[feature.get('id')] = new Style({

              image: new Circle({
                fill: new Fill({
                  color: '#000',
                }),
                stroke: new Stroke({
                  color: '#fff',
                  width: 2
                }),
                radius: 4
              })
            })

            return lcvStyleCache[feature.get('id')];
          }

        },
      }),
      ...this.generateCadastreVectors(active)
    ]
  }

  generateCadastreVectors(active) {
    return cadastreCountries.map(name => (
      new VectorTileLayer({
        name: name,
        zIndex: 3,
        declutter: true,
        visible: active === name,
        source: new PMTilesVectorSource({
          url: `https://s3.ecodatacube.eu/ifad/eu_cadaster/${name}_cp_CadastralParcel.pmtiles`
        }),
        style: new Style({
          fill: new Fill({
            color: 'transparent',
          }),
          stroke: new Stroke({
            color: '#000',
            width: 1
          }),
        })
      })
    ))
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