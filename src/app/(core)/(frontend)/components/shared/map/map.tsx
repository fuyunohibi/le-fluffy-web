'use client';
import React, { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMapEvent } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface Position {
  lat: number;
  lon: number;
  display_name?: string;
  place_id?: string;
}

// Default position when the map loads
const defaultPosition: [number, number] = [51.505, -0.09];

// Custom marker icon (Google Maps style)
const googleMapsMarker = L.icon({
  iconUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Pin-location.png",
  iconSize: [38, 38],
  iconAnchor: [19, 38], // Anchor point is the center-bottom of the icon
  popupAnchor: [0, -38], // Popup above the marker
});

// Component to handle the map click event
function ClickHandler({ setSelectPosition }: { setSelectPosition: React.Dispatch<React.SetStateAction<Position | null>> }) {
  useMapEvent("click", (event) => {
    setSelectPosition({
      lat: event.latlng.lat,
      lon: event.latlng.lng,
    });
  });
  return null;
}

// Component to reset the map view when a new position is selected
function ResetCenterView({ selectPosition }: { selectPosition: Position | null }) {
  const map = useMapEvent('click', () => {});

  useEffect(() => {
    if (selectPosition) {
      map.setView(
        L.latLng(selectPosition.lat, selectPosition.lon),
        map.getZoom(),
        {
          animate: true,
        }
      );
    }
  }, [selectPosition, map]);

  return null;
}

interface MapsProps {
  selectPosition: Position | null;
  setSelectPosition: React.Dispatch<React.SetStateAction<Position | null>>;
}

export default function Maps({ selectPosition, setSelectPosition }: MapsProps) {
  const MAPTILER_API_KEY = process.env.NEXT_PUBLIC_MAPTILER_API_KEY;
  const locationSelection: [number, number] | undefined = selectPosition
    ? [selectPosition.lat, selectPosition.lon]
    : undefined;

  return (
    <MapContainer
      center={defaultPosition}
      zoom={8}
      style={{ width: "100%", height: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url={`https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=${MAPTILER_API_KEY}`}
      />
      
      {/* If a position is selected, show the marker */}
      {selectPosition && locationSelection && (
        <Marker position={locationSelection} icon={googleMapsMarker}>
          <Popup>
            <p>Selected Location</p>
          </Popup>
        </Marker>
      )}

      {/* Handle map clicks */}
      <ClickHandler setSelectPosition={setSelectPosition} />
      <ResetCenterView selectPosition={selectPosition} />
    </MapContainer>
  );
}
