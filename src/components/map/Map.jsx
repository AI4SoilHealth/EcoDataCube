import { Feature, Geolocation, View } from "ol";
import olMap from "ol/Map";
import { fromLonLat, toLonLat } from "ol/proj";
import OLCesium from "olcs";
import { useContext, useEffect, useRef, useState } from "react";
import { defaults, ScaleLine } from "ol/control";

import * as Cesium from 'cesium';
import { AppContext } from "../../AppContext";
import $map from "../../services/$map";
import Comparison from "./Comparison";
import { createWorldTerrainAsync } from "cesium";
import Query from "../query/Query";
import { getRenderPixel } from "ol/render";
import { unByKey } from "ol/Observable";
import Style from "ol/style/Style";
import CircleStyle from "ol/style/Circle";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import VectorImageLayer from "ol/layer/VectorImage";
import { Vector } from "ol/source";
import { Point } from "ol/geom";
window.Cesium = Cesium;
window.Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwMzgxNTZkOC0wNDlmLTQxNTItODQ3MS01Y2IxNzgwN2NiOTAiLCJpZCI6NTgzMDQsImlhdCI6MTYyMzA3NDkxN30.vONojkn72YI5ZkWjRS11aRvW4YOyyZoU4bkUzwtGKiY';

function Map(props) {
  const { _3D, base, layer, layer2, vector, time, time2, depth, depth2, opacity, zoom, center, geolocation, layers, layers2, comparison, setState } = useContext(AppContext);
  const mapElement = useRef();
  const swipeRef = useRef(50);
  const basemapsRef = useRef([]);
  const layersRef = useRef([]);
  const layers2Ref = useRef([]);
  const vectorsRef = useRef([]);
  const overlayRef = useRef();
  const prerender1 = useRef();
  const postrender1 = useRef();
  const prerender2 = useRef();
  const postrender2 = useRef();
  const geolocationRef = useRef();
  const geolocationLayerRef = useRef();

  const [coordinates, setCoordinates] = useState(null);

  const [swipe, setSwipe] = useState(50);
  const isEmbedd = window.location.pathname.indexOf('embed') > -1;
  //HOTKEYS
  const initMapHotKeys = (evt) => {
    if (evt.key === '+' && document.activeElement.tagName !== 'INPUT') {
      $map.instance.getView().animate({ zoom: $map.instance.getView().getZoom() + 0.5, duration: 250 })
    }

    if (evt.key === '-' && document.activeElement.tagName !== 'INPUT') {
      $map.instance.getView().animate({ zoom: $map.instance.getView().getZoom() - 0.5, duration: 250 })

    }
  }

  //SET BASEMAP
  useEffect(() => {
    if ($map.instance) {
      $map.setBase(base, basemapsRef.current);
    }
  }, [base])

  //SET LAYER
  useEffect(() => {
    if ($map.instance) {
      if (comparison) {
        deactivateComparison();
        $map.setLayer(layer, layersRef.current, layers.find(l => l.title === layer));
        activateComparison($map.instance);
      } else {
        $map.setLayer(layer, layersRef.current, layers.find(l => l.title === layer));

      }
    }
  }, [layer]);

  useEffect(() => {
    if ($map.instance) {
      if (comparison) {
        deactivateComparison();
        $map.setLayer(layer2, layers2Ref.current, layers2.find(l => l.title === layer2));
        activateComparison($map.instance);
      }
    }
  }, [layer2]);

  //SET VECTOR
  useEffect(() => {
    if ($map.instance) {
      $map.setVector(vector, vectorsRef.current);
    }
  }, [vector]);

  useEffect(() => {
    if ($map.instance) {
      $map.setDepth(depth, layers.find(l => l.title === layer));
    }
  }, [depth]);

  useEffect(() => {
    if ($map.instance) {
      $map.setDepth(depth2, layers2.find(l => l.title === layer2));
    }
  }, [depth2]);

  useEffect(() => {
    if ($map.instance) {
      $map.setTime(time, layers.find(l => l.title === layer));
    }
  }, [time]);

  useEffect(() => {
    if ($map.instance) {
      $map.setTime(time2, layers2.find(l => l.title === layer2));
    }
  }, [time2]);



  useEffect(() => {
    if ($map.instance) {
      overlayRef.current.setPosition(coordinates);
    }
  }, [JSON.stringify(coordinates)]);


  //SET OPACITY
  useEffect(() => {
    if ($map.instance) {
      $map.setOpacity(opacity, [...layersRef.current, ...layers2Ref.current]);
    }
  }, [opacity])

  // TOGGLE 3D
  useEffect(() => {
    if ($map.instance) {
      if (_3D === true) {

        deactivateComparison()
        setState(current => ({
          ...current,
          comparison: false
        }));
      }
      setTimeout(() => {
        $map.ol3D.setEnabled(_3D);

        if (_3D === false) {
          $map.instance.getView().animate({ rotation: 0, duration: 250 })
        }
      }, 100)




    }
  }, [_3D])

  // TOGGLE GEOLOCATION
  useEffect(() => {
    if ($map.instance) {
      geolocationRef.current.setTracking(geolocation);
      if(!geolocation) {
        geolocationLayerRef.current.getSource().getFeatures()[0].setGeometry(null);
      }
    }
  }, [geolocation])

  useEffect(() => {
    if ($map.instance) {
      swipeRef.current = swipe;
      $map.instance.render()
    }
  }, [swipe])


  //INIT MAP
  useEffect(() => {
    //GENERATE BASEMAPS, WMS LAYERS, VECTOR LAYERS
    basemapsRef.current = $map.generateBaseMaps(base);
    layersRef.current = $map.generateLayers(layers);
    layers2Ref.current = $map.generateLayers(layers2);
    overlayRef.current = $map.createOverlay();
    vectorsRef.current = $map.generateVectorLayers(vector);

    const positionFeature = new Feature();
    positionFeature.setStyle(
      new Style({
        image: new CircleStyle({
          radius: 6,
          fill: new Fill({
            color: '#3399CC',
          }),
          stroke: new Stroke({
            color: '#fff',
            width: 2,
          }),
        }),
      }),
    );

    geolocationLayerRef.current = new VectorImageLayer({
      zIndex: 10,
      visible: true,
      source: new Vector({
        features: [positionFeature],
      })
    })




    //INIT MAP INSTANCE
    $map.instance = new olMap({
      target: mapElement.current,
      layers: [
        ...basemapsRef.current,
        ...layersRef.current,
        ...layers2Ref.current,
        ...vectorsRef.current,
        geolocationLayerRef.current,
      ],
      overlays: [overlayRef.current],
      controls: defaults().extend([new ScaleLine({className: 'ol-scale-line'})]),
      view: new View({
        center: fromLonLat(center),
        zoom: zoom
      })
    });

    if(isEmbedd) {
      document.querySelector('.ol-scale-line').style.bottom = '140px';
    }

    //INIT GEOLOCATION
    geolocationRef.current = new Geolocation({
      trackingOptions: {
        enableHighAccuracy: true,
      },
      projection: $map.instance.getView().getProjection(),
    });


    let geolocationKey = geolocationRef.current.on('change:position', (evt) => {
      const coordinates = geolocationRef.current.getPosition();
      positionFeature.setGeometry(coordinates ? new Point(coordinates) : null);

      $map.instance.getView().animate({center: coordinates, duration: 250}, {zoom: 12, duration: 250});
    })


    //INIT HOTKEYS
    document.addEventListener('keypress', initMapHotKeys);


    //INIT 3D INSTANCE
    $map.ol3D = new OLCesium({ map: $map.instance, sceneOptions: { requestRenderMode: true }, });
    let scene = $map.ol3D.getCesiumScene();

    createWorldTerrainAsync({ requestVertexNormals: true })
      .then(terrain => {
        scene.terrainProvider = terrain;
      })
    // scene.terrainProvider = Cesium.createWorldTerrain({ requestVertexNormals: true });

    $map.instance.on('singleclick', (evt) => {
      setCoordinates(evt.coordinate);
    })

    $map.instance.on('moveend', (evt) => {
      console.log(evt)
      setState(current => ({
        ...current,
        zoom: evt.map.getView().getZoom(),
        center: toLonLat(evt.map.getView().getCenter()),
      }))
    })

    return () => {
      document.removeEventListener('keypress', initMapHotKeys);
      unByKey(geolocationKey);

      $map.ol3D?.destroy();
      $map.instance?.setTarget(null);

      $map.ol3D = null;
      $map.instance = null;


    }
  }, []);

  const activateComparison = (mapInstance, swipe) => {
    let layer1st = layersRef.current.find(l => l.get('name') === layer);
    let layer2nd = layers2Ref.current.find(l => l.get('name') === layer2);

    prerender1.current = layer1st.on('prerender', (evt) => {
      try {
        let ctx = evt.context;
        let mapSize = mapInstance.getSize();
        let width = mapSize[0] * (swipeRef.current / 100);


        let tl = getRenderPixel(evt, [0, 0]);
        let tr = getRenderPixel(evt, [width, 0]);
        let bl = getRenderPixel(evt, [0, mapSize[1]]);
        let br = getRenderPixel(evt, [width, mapSize[1]]);

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(tl[0], tl[1]);
        ctx.lineTo(bl[0], bl[1]);
        ctx.lineTo(br[0], br[1]);
        ctx.lineTo(tr[0], tr[1]);
        ctx.closePath();
        ctx.clip();
      } catch {

      }

    });

    prerender2.current = layer2nd.on('prerender', (evt) => {
      try {
        let ctx = evt.context;
        let mapSize = mapInstance.getSize();
        let width = mapSize[0] * (swipeRef.current / 100);
        let tl = getRenderPixel(evt, [width, 0]);
        let tr = getRenderPixel(evt, [mapSize[0], 0]);
        let bl = getRenderPixel(evt, [width, mapSize[1]]);
        let br = getRenderPixel(evt, mapSize);



        ctx.save();
        ctx.beginPath();
        ctx.moveTo(tl[0], tl[1]);
        ctx.lineTo(bl[0], bl[1]);
        ctx.lineTo(br[0], br[1]);
        ctx.lineTo(tr[0], tr[1]);
        ctx.closePath();
        ctx.clip();
      } catch {

      }

    });

    postrender1.current = layer1st.on('postrender', (event) => {
      let ctx = event.context;
      ctx.restore();
    })

    postrender2.current = layer2nd.on('postrender', (event) => {
      let ctx = event.context;


      ctx.restore();
      try {
        let mapSize = mapInstance.getSize();
        let width = mapSize[0] * (swipeRef.current / 100);
        let tl = getRenderPixel(event, [width, 0]);
        let bl = getRenderPixel(event, [width, mapSize[1]]);

        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.strokeStyle = "#1A1A1A";
        ctx.moveTo(tl[0], tl[1]);
        ctx.lineTo(bl[0], bl[1]);
        ctx.stroke();
      } catch {

      }

      console.log('AAA')
    })

  }

  const deactivateComparison = () => {
    unByKey(prerender1.current);
    unByKey(prerender2.current);
    unByKey(postrender1.current);
    unByKey(postrender2.current);
    $map.instance.render();
  }


  // TOGGLE COMPARISON
  useEffect(() => {

    if ($map.instance) {


      if (comparison) {
        setState(current => ({
          ...current,
          _3D: false,
        }));

        console.log(comparison);

        let layer2nd = layers2Ref.current.find(l => l.get('name') === layer2).setVisible(true);

        activateComparison($map.instance, swipe);
      } else {
        deactivateComparison();
        layers2Ref.current.forEach(l => {
          l.setVisible(false)
        })
      }

    }


  }, [comparison])

  return (
    <>
      <div style={{ width: '100%', height: '100%', overflow: 'hidden' }} ref={mapElement}></div>

      <Query coordinates={coordinates} setCoordinates={setCoordinates} />
      {comparison && !_3D && <Comparison swipe={swipe} setSwipe={setSwipe} />}
    </>
  )
}

export default Map;