import React, { useEffect, useMemo, useRef, useState } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { cities } from "../seeds/cities";
import { useNavigate } from "react-router-dom";

interface Viewport {
  latitude: number;
  longitude: number;
  zoom: number;
  width?: string;
  height?: string;
}
function Mapbox({ placeDatas }: { placeDatas: any[] }) {
  const navigate = useNavigate();
  // setup map
  const [viewport, setViewport] = useState<Viewport>({
    latitude: 1.300911,
    longitude: 103.859908,
    zoom: 10,
    width: "100vw",
    height: "100vh",
  });
  const PointInMap = ({ point }: { point: any }) => {
    const [isHovered, setIsHovered] = useState(false);
    const popupRef = useRef(null);
    return (
      <Marker
        latitude={point?.place_geometry?.coordinates[1]}
        longitude={point?.place_geometry?.coordinates[0]}
      >
        <button
          className="border-none"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => handleClick(point)}
        >
          <div className="w-5 h-5">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2C8.13401 2 5 5.13401 5 9C5 13.5561 12 22 12 22C12 22 19 13.5561 19 9C19 5.13401 15.866 2 12 2ZM12 11C10.3431 11 9 9.65685 9 8C9 6.34315 10.3431 5 12 5C13.6569 5 15 6.34315 15 8C15 9.65685 13.6569 11 12 11Z"
                fill="#FF0000"
              />
            </svg>
          </div>
          {isHovered && (
            <Popup
              ref={popupRef}
              latitude={point?.place_geometry?.coordinates[1]}
              longitude={point?.place_geometry?.coordinates[0]}
            >
              <div className="place-info">
                <h3 className="font-bold text-gray-900">
                  {point?.place_title}
                </h3>
                <p>{point?.place_description}</p>
              </div>
            </Popup>
          )}
        </button>
      </Marker>
    );
  };
  const handleClick = (point: any) => {
    navigate(`/place/detail/${point._id}`);
  };
  const handleMove = (evt: any) => {
    // setViewport(evt);
    // console.log(evt);
    const { latitude, longitude, zoom } = evt.viewState;
    setViewport((prevViewport) => ({
      ...prevViewport,
      latitude,
      longitude,
      zoom,
    }));
  };
  const MemoizedMarkers = useMemo(() => {
    return placeDatas.map((point) => {
      return <PointInMap key={point._id} point={point} />;
    });
  }, [placeDatas]);
  return (
    <div className="">
      <Map
        style={{ width: "100%", height: "300px" }}
        {...viewport}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        // attributionControl={false}
        onMove={handleMove}
      >
        {MemoizedMarkers}
      </Map>
    </div>
  );
}

export default Mapbox;
