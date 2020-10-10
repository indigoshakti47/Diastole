import React from 'react';
import { Map, Marker, InfoWindow, GoogleApiWrapper } from 'google-maps-react';

const MapContainer = ({ google }) => {


  const onMarkerClick = marker => 
  const onInfoWindowClose = console.log

  return (
    <Map google={google} zoom={14}>
      <Marker onClick={onMarkerClick}
        name={'Current location'} />

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
