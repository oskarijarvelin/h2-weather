import { Spinner, Alert } from 'react-bootstrap';

export default function Position({ lat, lng, isLoadingCoords }) {
  return (
    <div>
        <h2 className="pb-3">User location:</h2>
        <Alert variant={'info'} className="d-inline-block">
            {isLoadingCoords === true &&
                <div className="d-flex align-items-center">
                    <Spinner animation="border" size="sm" />
                    <p className="lead pl-3 m-0">Loading...</p>
                </div>
            }

            {isLoadingCoords === false &&
                <>
                    <span className="pr-4">{lat.toFixed(3)}</span>
                    <span>{lng.toFixed(3)}</span>
                </>
            }
        </Alert>
    </div>
    
  );
}