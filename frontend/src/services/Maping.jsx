import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

function ResizeFix() {
  const map = useMap();

  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 0);
  }, [map]);

  return null;
}

export default function Maping() {
  return (
    <div style={{ height: "700px", width: "90%" ,marginTop: "50px",margin: "0 auto"}}>
      <MapContainer
        center={[28.6139, 77.2090]}
        zoom={10}
        style={{ height: "100%", width: "100%" }}
      >
        <ResizeFix />

        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={[28.6139, 77.2090]}>
          <Popup>New Delhi</Popup>
        </Marker>

      </MapContainer>
    </div>
  );
}
