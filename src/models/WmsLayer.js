import TileLayer from "ol/layer/Tile";
import { URL } from "../config/urls";
import { TileWMS } from "ol/source";
import moment from "moment";

class WmsLayer {
  static themeMap = {
    soil: 'Soil & Terrain',
    clm: 'Climate',
    veg: 'Forests & Vegetation',
    'air quality': 'Air Quality',
    imagery: 'Imagery',
    lc: 'Land Cover & Land Use',
    dtm: 'Soil & Terrain',
    'building mask': 'Building Mask'
  }

  static themesEmpty = {
    'Soil & Terrain': [],
    'Climate': [],
    'Forests & Vegetation': [],
    'Air Quality': [],
    'Imagery': [],
    'Land Cover & Land Use': [],
    'Building Mask': []
  }

  constructor({
    id,
    srv_path,
    filename_pattern,
    catalog,
    code,
    title,
    description,
    keywords_list,
    version,
    doi,
    citation,
    license,
    layer_unit,
    expression_json,
    contact_name,
    contact_email,
    providers_list,
    constellation_list,
    platform,
    gsd,
    range,
    range_label,
    start_date,
    end_date,
    date_step,
    date_offset,
    date_unit,
    date_style,
    ignore_1,
    ignore_29feb,
    depth_list,
    var_list,
    qml_url,
    main_url,
    url_1,
    url_2,
    url_3,
    url_4,
    url_5,
    defaultActive,
    defaultOpacity,
    isCompare,
    transform_func
  }) {
    try {
      let gsName = range === null && depth_list === null && var_list === null ? main_url.split('/')[main_url.split('/').length - 1].replace('.tif', '') : srv_path;
      let lRange = range ? [...new Set(range.split(','))] : [];
      let lTitle = isCompare ? `${title}-2` : title;
      this.id = id;
      this.timeDimension = this.getDimension(range, var_list, depth_list);
      this.depthDimension = 'DIM_DEPTH';
      this.title = lTitle;
      this.description = description;
      this.queryUrl = URL.QUERY_STREAM + `?lat=__LAT__&lon=__LON__&files=${filename_pattern}${main_url.split('/')[main_url.split('/').length - 1].replace(/\{(.*?)\}/g, '*')}`;
      // this.hasUncertainty = null;
      this.gsName = 'edc:' + gsName;
      // this.gsStyle = URL.BASE_STYLE + qml_url.split('/')[qml_url.split('/').length - 1].replace('.qml', '.sld');
      this.gsStyle = URL.BASE_STYLE + gsName;
      // this.type = type;
      this.class = code;
      // this.theme = theme;
      // this.themeNumber = theme_number;
      this.defaultTime = range ? range.split(',')[range.split(',').length - 1] : undefined;
      this.defaultDepth = depth_list ? depth_list.split(',')[0] : undefined;
      this.range = lRange;
      this.rangeLabels = this.formatRangeLabels(lRange, date_unit, var_list, date_step, date_offset);
      this.depths = depth_list ? depth_list.split(',') : [];

      // this.scale = scale;
      this.unit = layer_unit;
      // this.hasPoints = Boolean(has_points);
      this.download = main_url;
      this.metadata = `https://stac.ecodatacube.eu/${id}/collection.json`;

      this.tileLayer = this.createTileLayer(lTitle, defaultActive === lTitle, defaultOpacity / 100, gsName, range, var_list, depth_list);
      this.defaultActive = defaultActive === lTitle;
      this.defaultOpacity = defaultOpacity / 100
      this.isVars = Boolean(var_list);
      this.transformFunction = transform_func ? Function('x', `return ${transform_func}`) : null;
    } catch (error) {
      console.log(error)
    }

  }

  formatRangeLabels(range, date_unit, var_list, date_step, date_offset) {
    if(var_list) {
      return range.map((val => val.split('.').map(v => v.toUpperCase()).join(' ')))
    }

    if(range) {
      if(date_unit === 'years') {

        if(date_step === 1) {
          return range.map(val => val.slice(0, 4));
        } else {
          return range.map((val, index) => {
            return val.split('_').map(v => v.slice(0,4)).join('-');
          });
  
        }
        
      } 

      if(date_unit === 'months') {
        if(date_step === 1) {
          let formated = range.map(val => `${moment(val.slice(0, 4) + val.slice(4, 6)).format('MMM YYYY')}`);
       
          return formated;
        } else {
          let formated = range
            .map(val => {
              let split = val.split('_');
              let from = moment(split[0].slice(0, 4) + split[0].slice(4, 6)).format('MMM YYYY')
              let to = moment(split[1].slice(0, 4) + split[1].slice(4, 6)).format('MMM YYYY')
              return `${from} - ${to}`;
            })
          return formated;

          return range.split(',').map((val, index) => {
            return val.split('_').map(v => v.slice(0,4)).join('-');
          })
  
        }
      }

      return [];
    }

    return []
  }

  getDimension(range, var_list, depth_list) {
    if(var_list) {
      return 'DIM_VARIABLE';
    }

    if(range && !depth_list)  {
      return 'DIM_DATE';
    }

    if(range && depth_list) {
      return 'DIM_YEAR';
    }

    return null;
  }

  generateRangeLabels(range, scale) {
    if (range) {
      if (scale === 'year') {

      }
    }
  }

  getAllProperties() {
    // return {
    //   id: this.id,
    //   title: this.title,
    //   description: this.description,
    //   queryUrl: this.queryUrl,
    //   hasUncertainty: this.hasUncertainty,
    //   gsName: this.gsName,
    //   gsStyle: this.gsStyle,
    //   type: this.type,
    //   theme: this.theme,
    //   themeNumber: this.themeNumber,
    //   range: this.range,
    //   rangeLabels: this.rangeLabels,
    //   scale: this.scale,
    //   unit: this.unit,
    //   hasPoints: this.hasPoints,
    //   download: this.download,
    //   metadata: this.metadata
    // }
  }

  generateParams(gsName, time, depth, range, depth_list) {
    let params = {
      'LAYERS': gsName,
      'FORMAT': 'image/png',
      'VERSION': '1.3.0',
    }

    if(time) {
      params[time] = range.split(',')[range.split(',').length - 1];
    }

    if(depth) {
      params[depth] = depth_list.split(',')[depth_list.split(',').length - 1];
    }



    return params;
  }

  createTileLayer(title, defaultActive, defaultOpacity, gsName, range, var_list, depth_list) {
    let timeDimension = this.getDimension(range, var_list, depth_list);
    let depthDimension = depth_list ? 'DIM_DEPTH' : null;

    return new TileLayer({
      name: title,
      preload: Infinity,
      visible: defaultActive,
      opacity: defaultOpacity,
      dimension: timeDimension,
      dimensionDepth: depthDimension,
      zIndex: 2,
      source: new TileWMS({
        url: URL.BASE_WMS,
        transition: 0,
        params: this.generateParams('edc:' + gsName, timeDimension, depthDimension, range, depth_list)
      })
    })
  }

  copyTileLayer() {
    return new TileLayer({

    })
  }


}

export default WmsLayer;