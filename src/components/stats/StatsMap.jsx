import { useContext, useEffect, useRef } from "react";
import olMap from 'ol/Map';
import TileLayer from "ol/layer/Tile";
import VectorSource from "ol/source/Vector";
import HeatMap from "ol/layer/Heatmap";
import { AppContext } from "../../AppContext";
import { Feature, View } from "ol";
import { fromLonLat } from "ol/proj";
import { Stack } from "@mui/material";
import OSM from "ol/source/OSM";
import { Point } from "ol/geom";

function StatsMap(props) {
  const mapElement = useRef(null);
  const mapInstance = useRef();
  const { zoom, center } = useContext(AppContext);

  const createFeatures = (coordinates) => {
    return coordinates.map(coord => {
      return new Feature({
        geometry: new Point(fromLonLat([coord.lon, coord.lat]))
      })
    })
  }

  useEffect(() => {

    mapInstance.current = new olMap({
      target: mapElement.current,
      layers: [
        new TileLayer({
          preload: Infinity,
          zIndex: 1,
          className: 'ol-layer ol-grayscale',
          source: new OSM()
        }),
        new HeatMap({
          zIndex: 2,
          source: new VectorSource({
            features: createFeatures(props.layer.points)
          })
        })
      ],
      view: new View({
        zoom,
        center: fromLonLat(center),
      })
    })

    mapInstance.current.getView().fit(mapInstance.current.getLayers().getArray()[1].getSource().getExtent(), {padding: [100, 100, 100, 100], maxZoom: 12});

    return () => {
      mapInstance.current?.setTarget(null);
    }
  }, [])

  useEffect(() => {
    if (mapInstance.current) {
      mapInstance.current.getLayers().getArray()[1].getSource().clear();
      mapInstance.current.getLayers().getArray()[1].getSource().addFeatures(createFeatures(props.layer.points));
      mapInstance.current.getView().fit(mapInstance.current.getLayers().getArray()[1].getSource().getExtent(), {padding: [100, 100, 100, 100], maxZoom: 12});
    }
  }, [JSON.stringify(props.layer.layer)])

  return (
    <div style={{ height: '400px', width: '70%' }} ref={mapElement}></div>
  )

}

export default StatsMap;