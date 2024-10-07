import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapTilerMapProps {
  latitude: number;
  longitude: number;
}

// Custom marker icon
const googleMapsMarker = L.icon({
  iconUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Pin-location.png",
  iconSize: [38, 38],  
  iconAnchor: [19, 38],
  popupAnchor: [0, -38], 
});

const MapTilerMap: React.FC<MapTilerMapProps> = ({ latitude, longitude }) => {
  const MAPTILER_API_KEY = process.env.NEXT_PUBLIC_MAPTILER_API_KEY;

  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={15}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url={`https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=${MAPTILER_API_KEY}`}
        attribution='&copy; <a href="https://www.maptiler.com/copyright/">MapTiler</a>'
      />
      <Marker position={[latitude, longitude]} icon={googleMapsMarker}>
        <Popup>
          Location: Latitude {latitude}, Longitude {longitude}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapTilerMap;
