import React from 'react';
import { Map, Marker, InfoWindow, GoogleApiWrapper } from 'google-maps-react';

const MapContainer = ({ google, citizens }) => {


  const onMarkerClick = marker => console.log(marker)
  const onInfoWindowClose = console.log

  return (
    <Map google={google} zoom={14}>
      {
        citizens.map(c => <Marker position={{ lat: c.location.log, lng: c.location.lat }} key={c.document_number} onClick={onMarkerClick}
          name={'Current location'} />)
      }

      <InfoWindow onClose={onInfoWindowClose}>
        <div>
          <h1>Somewhere</h1>
        </div>
      </InfoWindow>
    </Map>
  )
}

const LoadingContainer = () => (
  <div>The map is loading!</div>
)

export default GoogleApiWrapper({
  apiKey: ('AIzaSyCZjeOyuTKNBMKlXcEXZIrrzq48fokQGdw'),
  LoadingContainer
})(MapContainer)
