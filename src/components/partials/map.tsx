import React, { useEffect, useRef, useState } from "react";
import logo192 from "../../../public/logo192.png";
import Map, {
  FullscreenControl,
  GeolocateControl,
  Marker,
  NavigationControl,
} from "react-map-gl";
// import "mapbox-gl/dist/mapbox-gl.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { cities } from "../seeds/cities";
import Supercluster from "supercluster";

interface Viewport {
  latitude: number;
  longitude: number;
  zoom: number;
  width?: string;
  height?: string;
}

const supercluster = new Supercluster({
  radius: 75,
  maxZoom: 20,
});
function Mapbox() {
  // setup map

  const [viewport, setViewport] = useState<Viewport>({
    latitude: 41.8781136,
    longitude: -87.6297982,
    zoom: 10,
    width: "100vw",
    height: "100vh",
  });
  const [placeData, setPlaceData] = useState<any[]>([]);
  const [points, setPoints] = useState<any[]>([]);
  const [bounds, setBounds] = useState<any>([]);
  const [clusters, setClusters] = useState<any[]>([]);
  const [zoom, setZoom] = useState(0);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    setPlaceData(cities);
  }, []);

  useEffect(() => {
    const points = placeData.map((point) => ({
      type: "Feature",
      properties: {
        cluster: false,
        crimeId: point.rank,
      },
      geometry: {
        type: "Point",
        coordinates: [point.longitude, point.latitude],
      },
    }));
    setPoints(points);
  }, [placeData]);

  useEffect(() => {
    supercluster.load(points);
    setClusters(supercluster.getClusters(bounds, zoom));
  }, [points, zoom, bounds]);

  useEffect(() => {
    if (mapRef.current) {
      setBounds(mapRef.current.getMap().getBounds().toArray().flat());
    }
  }, [mapRef.current]);

  console.log(points, "points");
  console.log(bounds, "bounds");
  console.log(clusters, "clusters");
  console.log(supercluster, "supercluster");

  return (
    <div className="">
      <Map
        style={{ width: "100%", height: "300px" }}
        {...viewport}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        // attributionControl={false}
        onMove={(evt: any) => setViewport({ ...evt })}
        ref={mapRef}
        onZoomEnd={(e: any) => setZoom(Math.round(e.viewState.zoom))}
      >
        {clusters.map((cluster) => {
          // every cluster point has coordinates
          const [longitude, latitude] = cluster.geometry.coordinates;
          // the point may be either a cluster or a crime point
          const { cluster: isCluster, point_count: pointCount } =
            cluster.properties;
          if (isCluster) {
            return (
              <Marker latitude={latitude} longitude={longitude}>
                <div
                  className="text-white bg-blue-500 rounded-full p-4 flex items-center justify-center"
                  style={{
                    width: `${10 + (pointCount / points.length) * 20}px`,
                    height: `${10 + (pointCount / points.length) * 20}px`,
                  }}
                  onClick={() => {
                    const expansionZoom = Math.min(
                      supercluster.getClusterExpansionZoom(cluster.id),
                      20
                    );

                    mapRef.current.flyTo({
                      center: [longitude, latitude],
                      expansionZoom,
                      speed: 2,
                    });
                  }}
                >
                  {pointCount}
                </div>
              </Marker>
            );
          }
          return (
            <Marker latitude={latitude} longitude={longitude}>
              <button className="border-none bg-red-200">
                <img
                  className="w-4 h-4"
                  alt=""
                  src="https:res.cloudinary.com/douqbebwk/image/upload/v1600103881/YelpCamp/lz8jjv2gyynjil7lswf4.png"
                />
              </button>
            </Marker>
          );
        })}
      </Map>
    </div>
  );
}

export default Mapbox;
