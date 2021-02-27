import { useEffect, useState } from 'react';
import { Alert, Spinner } from 'react-bootstrap';

export default function Weather({lat, lng, isLoadingCoords}) {
  const { REACT_APP_API_URL, REACT_APP_API_KEY, REACT_APP_ICON_URL } = process.env;
  const [temp, setTemp] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [dir, setDir] = useState(0);
  const [desc, setDesc] = useState('');
  const [icon, setIcon] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const url = REACT_APP_API_URL +
    '?lat=' + lat +
    '&lon=' + lng +
    '&units=metric' + 
    '&appid=' + REACT_APP_API_KEY;

    fetch(url)
    .then(res => res.json())
    .then(
      (result) => {
        if (result.main !== undefined) {
          setTemp(result.main.temp);
          setSpeed(result.wind.speed);
          setDir(result.wind.deg);
          setDesc(result.weather[0].description);
          setIcon(REACT_APP_ICON_URL + result.weather[0].icon + '@2x.png');
          setIsLoading(false);
        } else {
          alert('Could not read weather information!')
        }
      }, (error) => {
        alert('Weather API Error: ' + error);
      }
    )
  }, []) 

  return (
    <div className="pt-4">
      <h2 className="pb-3">User weather:</h2>
      {isLoading === true &&
        <div className="d-flex align-items-center">
          <Spinner animation="border" />
          <p className="lead pl-3 m-0">Loading...</p>
        </div>
      }

      {isLoading === false &&
        <>
          <Alert variant={'info'} className="d-inline-block px-4">
            <p class="display-4 pb-3 weather-description" style={{paddingLeft: "100px"}}>{desc}</p>
            <p><b className="weather-prop">Temperature:</b> {temp} &#8451;</p>
            <p><b className="weather-prop">Wind speed:</b> {speed} m/s</p>
            <p><b className="weather-prop">Wind direction:</b> {dir} deg</p>
            <img src={icon} alt={desc} style={{position: "absolute", top: "10px", left: "10px"}} />
          </Alert>
        </>
      }
    </div>
  );
}