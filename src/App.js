import { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Position from './Position';
import Weather from './Weather';

function App() {
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [isLoadingCoords, setIsLoadingCoords] = useState(true);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        setLat(position.coords.latitude)
        setLng(position.coords.longitude)
        setIsLoadingCoords(false)
      }, (error) => {
        alert('Geolocation Error: ' + error)
      })
    } else {
      alert('Your browser does not support geolocation!')
    }
  }, [])
  
  return (
    <div className="App py-5">

      <Container>
        <Row>
          <Col>
            <h1>H2: Weather</h1>
            <p className="lead pt-2">Get local weather using geolocation</p>
          </Col>
        </Row>

        <Row className="pt-4 pb-5 mb-5">
          <Col>
            <Position lat={lat} lng={lng} isLoadingCoords={isLoadingCoords} />

            {isLoadingCoords === true &&
              <div className="d-flex align-items-center">
                <Spinner animation="border" />
                <p className="lead pl-3 m-0">Loading...</p>
              </div>
            }

            {isLoadingCoords === false &&
              <Weather lat={lat} lng={lng} /> 
            }
          </Col>
        </Row>
      </Container>

      <Container>
        <Row>
          <Col>
            <p>&copy; 2021: Oskari Järvelin, TIK20KM.</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
