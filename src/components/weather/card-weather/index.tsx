import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { weather } from '../../../redux/weather/actions';
import Loading from '../../Loading';
import { Card } from 'antd';
import { IoMdCloudy, IoMdRainy, IoMdSnow, IoMdSunny, IoMdThunderstorm } from 'react-icons/io';
import { BsCloudDrizzleFill, BsCloudHaze2Fill, BsEye, BsThermometer, BsWater, BsWind } from 'react-icons/bs';
import { formatDate } from '../../../utils/handlerDate';
import { TbTemperatureCelsius } from 'react-icons/tb';

const CardWeather = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [location, setLocation] = useState<string>('HaNoi');
  const dispatch = useDispatch();
  const weatherSelector = useSelector(({ weather } : any) => weather);
  const [weatherData, setWeatherData] = useState({name: '', sys: { country: '' }, weather: [{ main: '', description: '' }], main: { temp: '', feels_like: 0, humidity: 0}, visibility: 0, wind: { speed: 0 }});
  const [icon, setIcon] = useState<React.ReactNode>();

  useEffect(() => {
    // dispatch(weather({ location }))
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        dispatch(weather({ lat: latitude, lon: longitude }));
      }, (error) => {
        console.error(error);
      });
    }
  }, [])

  useEffect(() => {
    if(weatherSelector) {
      setIsLoading(weatherSelector.loading);
      if(weatherSelector.weather && weatherSelector.weather.weather) {
        setWeatherData(weatherSelector.weather);
        switch (weatherSelector.weather.weather[0].main) {
          case 'Clouds':
            setIcon(<IoMdCloudy/>);
            break;
          case 'Haze':
            setIcon(<BsCloudHaze2Fill/>);
            break;
          case 'Rain':
            setIcon(<IoMdRainy/>);
            break;
          case 'Clear':
            setIcon(<IoMdSunny/>);
            break;
          case 'Drizzle':
            setIcon(<BsCloudDrizzleFill/>);
            break;
          case 'Snow':
            setIcon(<IoMdSnow/>);
            break;
          case 'Thunderstorm':
            setIcon(<IoMdThunderstorm/>);
            break;
        }
      }
    }
  }, [weatherSelector])
  return (
    <Card
      style={{
        width: '96%',
        margin: '10px auto',
        height: '256px',
        backgroundColor: 'rgba(16, 162, 197, 0.45)',
      }}
    >
      <Loading isLoading={isLoading}/>
          <div className="mt-2 p-4 border-b border-grey-light  text-center">
            <span className="text-4xl text-white font-thin">{ weatherData.name }, { weatherData.sys.country}</span>
          </div>
          <div className="flex items-center justify-center">
            <div className="text-center text-[87px] text-white text-grey-light p-4">
              <span>{icon}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="p-2 flex-col items-center justify-center">
                  <div className="flex items-center text-lg text-grey-light">
                      <span className="flex items-center text-left text-5xl text-white mx-6  font-thin">
                        { parseInt(weatherData.main.temp, 10) } <span className="text-4xl"> <TbTemperatureCelsius/> </span>
                      </span>
                      <span className="capitalize text-white">{weatherData.weather[0].description}</span>
                    </div>
                  <div className="m-auto text-center justify-center text-grey-light text-white tracking-wide">
                    { formatDate() }
                  </div>
              </div>
              <div className="flex-col ml-10">
                <div className="flex text-white items-center gap-x-2">
                  <div >
                    <BsEye/>
                  </div>
                  <div >
                    Visibility{' '}
                    <span className="ml-2">
                      {weatherData.visibility / 1000} km
                    </span>
                  </div>
                </div>
                <div className="flex text-white items-center gap-x-2">
                  <div >
                    <BsThermometer/>
                  </div>
                  <div className="flex items-center" >
                    Feels like{' '}
                    <span className="ml-2">
                      {weatherData.main.feels_like}
                    </span>
                    <TbTemperatureCelsius/>
                  </div>
                </div>
                <div className="flex text-white items-center gap-x-2">
                  <div >
                    <BsWater/>
                  </div>
                  <div className="flex items-center" >
                    Humidity{' '}
                    <span className="ml-2">
                      {weatherData.main.humidity} %
                    </span>
                  </div>
                </div>
                <div className="flex text-white items-center gap-x-2">
                  <div >
                    <BsWind/>
                  </div>
                  <div className="flex items-center" >
                    Wind{' '}
                    <span className="ml-2">
                      {weatherData.wind.speed} m/s
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
    </Card>
  )
}

export default CardWeather
