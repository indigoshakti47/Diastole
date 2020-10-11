import React from 'react';
import { Map, Marker, InfoWindow, GoogleApiWrapper, Polygon } from 'google-maps-react';

const BOGOTA_COORDS = {
  lat: 4.693452,
  lng: -74.1395317
}

const MapContainer = ({ google, citizens }) => {
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

  const onMarkerClick = marker => console.log(marker)
  const onInfoWindowClose = console.log
  const center = citizens.length > 0 ? citizens[0].location : {}

  const _onMapLoaded = (mapProps, map) => {
    centerMap(map);
    setTimeout(() => {
      animationPlane(map, citizens[0].location);
    }, 3000)
  }

  const centerMap = (map) => {
    const bounds = new google.maps.LatLngBounds();
    citizens.forEach(({ location: { lat, lng } }) => bounds.extend(
      new google.maps.LatLng(lat, lng)
    ));
    map.fitBounds(bounds);
  }

  const animationPlane = (map, target) => {
    const marker = new google.maps.Marker({
      position: BOGOTA_COORDS,
      map,
      title: "Plane",
    });

    const frames = [];
    for (let percent = 0; percent < 1; percent += 0.02) {
      const curLat = BOGOTA_COORDS.lat + percent * (target.lat - BOGOTA_COORDS.lat);
      const curLng = BOGOTA_COORDS.lng + percent * (target.lng - BOGOTA_COORDS.lng);
      frames.push(new google.maps.LatLng(curLat, curLng));
    }

    const move = (marker, frames, index, wait, newDestination) => {
      marker.setPosition(frames[index]);
      if (index != frames.length - 1) {
        // call the next "frame" of the animation
        setTimeout(function () {
          move(marker, frames, index + 1, wait, newDestination);
        }, 600);
      }
    }

    // begin animation, send back to origin after completion
    move(marker, frames, 0, 20, marker.position);

  }

  return (
    <Map google={google} zoom={6} center={center} onReady={_onMapLoaded}>
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
