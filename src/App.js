import './App.css';
import Search from './components/search/search';
import CurrentWeather from './components/current-weather/current-weather';
import RandomWeather from './components/random-weather/random-weather';
import TreeWeather from './components/tree-weather/tree-weather';
import LineWeather from './components/line-weather/line-weather';
import {weather_api_url, weather_api_key} from './api';
import {useState} from 'react';
import axios from 'axios';
function App() {
  const [currentweather, setcurrentweather] = useState(null);
  const [mldata,setdata]= useState({})
  const [loadingPrediction,setLoadingPrediction] = useState(true)
  const handleonsearchchange =(searchdata)=>{
    const [lat, lon] = searchdata.value.split(" ");
    axios.get(`${weather_api_url}/weather?lat=${lat}&lon=${lon}&appid=${weather_api_key}&units=metric`)
    .then( response =>{
      const weatherResponse= response.data
      setcurrentweather({city:searchdata.label, ...weatherResponse});
      axios.post('http://localhost:5000/api',{
        main: weatherResponse.main,
        wind: weatherResponse.wind,
        clouds: weatherResponse.clouds
      })
      .then(res=>{
        setLoadingPrediction(false)
        setdata(res.data)
      })
      .catch(err=>console.log(err))
    })
    .catch((err)=> console.log(err));
    
  }
  console.log(currentweather)
  return (
    <div className="container">
      <Search onsearchchange={handleonsearchchange}/>
      {currentweather && <CurrentWeather data={currentweather}/>}
      {loadingPrediction ?(
        <p>loading....</p>
      ) :(
      <div>
          {mldata && <RandomWeather data={mldata}/>}
          {mldata && <TreeWeather data={mldata}/>}
          {mldata && <LineWeather data={mldata}/>}
        </div>)}
    </div>
  );
}

export default App;
