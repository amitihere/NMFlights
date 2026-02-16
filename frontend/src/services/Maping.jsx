import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import axios from "axios";
import './Maping.css'

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
  useEffect(()=> {
    const loader = async () => {
      try{
          const respo = await axios.get(`http://localhost:3000/api/reqFlights/airports`)
          console.log(respo.data)
      }catch(err){
        console.err(err)
      }
    }
    loader()
  },[])

  return (
    <>
      <div className="header">
        <h1>Locate Flight on Maps</h1>
        <p>
          This section helps you track live flights on the map in real-time.
          You can view exact positions, routes, and other important flight details
          visually for better understanding.
        </p>
        <span style={{color:"red",margin:'10px'}}>Please search for the data of flight which is active</span>
      </div>

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
        </MapContainer>
      </div>
      <div>
        
      </div>
      
    </>
  );
}
