import react from "react";
import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup
} from 'react-leaflet';
import L from "leaflet"
import {useState, useEffect} from "react";

import './App.css'
import  Axios from "axios";

function App() {
  const [Coordinate, setCoordinate] = useState([]);
  useEffect(()=>{
    const fetchItems = async () => {
      const result = await Axios(
        "http://localhost:3001/getOne"
      );
      setCoordinate(result.data);
      console.log(result.data);
    };
    fetchItems();
  }, []);
  console.log("oof",Coordinate);


  return (
    
    <MapContainer center={[51.5, 7.962935164168075]} zoom={13} style = {{height: '100vh', width:'100wh'}}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />

 { [Coordinate].map(cor =>{
      console.log("Marker posi", cor.lat,cor.lon);       
      <Marker position={[cor.lat, cor.lon]}>
        <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
  })
 
 }
  <Marker position={[0, 0]} icon={GetIcon()}>
        <Popup>
        A pretty CSS3 popup. <br /> Static marker for test.
        </Popup>
      </Marker>
</MapContainer>
  );
}

function GetIcon()
{
  return L.icon({
    iconUrl:require("./Icons/plane.png"),
    iconSize:[40],
    iconAnchor:[20,0]
  });
}

export default App;
