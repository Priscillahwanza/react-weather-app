import React,{useState,useEffect} from 'react';
import './App.css';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup'




function App() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [windspeed, setWindspeed] =useState(null);
  const [time, setTime] = useState(null);
 const [city,setCity] =useState(null);
  
 
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
    axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,cloudcover_mid,windspeed_120m&current_weather=true`)
    .then((res) => {
      setTemperature(res.data.current_weather.temperature)
      setWindspeed(res.data.current_weather.windspeed)
      setTime(res.data.current_weather.time)

    })
   
      
 
  },[latitude,longitude])
  
  axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`)
  .then((res) => {
    setCity(res.results.name)
  })

  
  return (
    <div className='main'>
      <div className="App">
      <div className='app-top'>
      <h1>Cyweather App</h1>
      <div className='app-coordinates'>
        <input
        type='number'
        value={latitude}
        placeholder='Latitude'
        />
        <input
        type='number'
        value={longitude}
        placeholder='Longitude'
        />
         <input
      type="text"
      value={city}
      placeholder="Enter your City"/>
      <div className='details'>
      </div>
     
      

      </div>
      <div className='details'>
      <CardGroup className='card' >
               
                
                <Card>
                    <Card.Title>Temperature:{temperature} ℃</Card.Title>    
                </Card>
                <Card>
                   <Card.Title>Wind Speed:{windspeed}km/h</Card.Title>
                </Card>
               <Card>
                    <Card.Title>Time{time}</Card.Title>
                </Card>
                
            </CardGroup>
      </div>
        
        </div></div>

    </div>
    
  );
  }

export default App;
