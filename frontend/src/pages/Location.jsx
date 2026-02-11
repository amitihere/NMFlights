import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Location.css";

export default function Location() {
  const [flights, setFlights] = useState([]);
  useEffect(() => {
    const loader = async () => {
      const response = await axios.get("http://localhost:3000/flights");
      setFlights(response.data);
    }
    loader();
  }, []);
  console.log(flights)
  return (
    <div>
      <h1>Location</h1>
      <p>dasdasdasdasd</p>
      <h1>sadsadasdafdaadsf</h1>
    </div>
  );
}
