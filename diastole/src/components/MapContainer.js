import React from 'react';
import { Map, Marker, InfoWindow, GoogleApiWrapper, Polygon } from 'google-maps-react';

const generatePolygonPoints = (location, radius) => {
  let coordinates = []
  for (let i = 0; i < 360; i++) {
    coordinates.push({
      lat: location.lat + radius * Math.sin(i * Math.PI / 180),
      lng: location.lng + radius * Math.cos(i * Math.PI / 180)
    })
  }

  return coordinates
}

const MapContainer = ({ google, citizens }) => {
  const onMarkerClick = marker => console.log(marker)
  const onInfoWindowClose = console.log
  const center = citizens.length > 0 ? citizens[0].location : {}

  return (
    <Map google={google} zoom={6} center={center}>
      {
        citizens.map(c => <Marker
          position={c.location}
          key={c.document_number}
          onClick={onMarkerClick}
          name={'Current location'}
          icon={{
            url: "./logo192.png",
            anchor: new google.maps.Point(32, 32),
            scaledSize: new google.maps.Size(64, 64)
          }}
        />)
      }
      {
        citizens.map((c, index) => <Polygon
          paths={generatePolygonPoints(c.location, 2)}
          key={c.index}
        />)
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
