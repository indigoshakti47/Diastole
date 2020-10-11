import React, { useState } from 'react';
import { Map, Marker, InfoWindow, GoogleApiWrapper, Polygon } from 'google-maps-react';
import Button from '@material-ui/core/Button'
import { high, low, medium } from '../constants/Priorities'
import '../styles/InfoWindow.scss'

const BOGOTA_COORDS = {
  lat: 4.693452,
  lng: -74.1395317
}

const MapContainer = ({ google, citizens }) => {
  const [infoMarker, setInfoMarker] = useState(null);
  const [selectedCitizen, setSelectedCitizen] = useState({});

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

  const onMarkerClick = (marker, citizen) => {
    setInfoMarker(marker);
    setSelectedCitizen(citizen);
  }

  const onInfoWindowClose = () => {
    setInfoMarker(null);
    setSelectedCitizen({});
  }

  const getPriorityColor = (sisben) => {
    if (sisben <= high.maxPoints) return high.color;
    if (sisben <= medium.maxPoints) return medium.color;
    return low.color;
  }

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

  const radians_to_degrees = radians => radians * (180/ Math.PI)

  const calcAngle = (point1, point2) => {
    const dLng = (point1.lng - point2.lng);

    const y = Math.sin(dLng) * Math.cos(point2.lat);
    const x = Math.cos(point1.lat) * Math.sin(point2.lat) - Math.sin(point1.lat)
            * Math.cos(point2.lat) * Math.cos(dLng);

    let brng = Math.atan2(y, x);

    brng = radians_to_degrees(brng);
    brng = (brng + 360) % 360;
    const deg = 360 - brng;
    if ((deg >=0 && deg < 45) || deg > 315) return './plane0.png';
    if (deg >= 45 && deg < 135) return './plane90.png';
    if (deg >= 135 && deg < 225) return './plane180.png';
    if (deg >= 225 && deg < 315) return './plane270.png';
  }

  const animationPlane = (map, target) => {
    const image = calcAngle(BOGOTA_COORDS, target);
    const marker = new google.maps.Marker({
      map,
      position: BOGOTA_COORDS,
      optimized: false,
      icon: {
        url: image,
        anchor: new google.maps.Point(15, 15),
        scaledSize: new google.maps.Size(30, 30),
      },
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
      if (index !== frames.length - 1) {
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
    <Map
      google={google}
      zoom={6}
      onReady={_onMapLoaded}>
      {
        citizens.map(c => <Marker
          position={c.location}
          key={c.document_number}
          onClick={(props, marker) => onMarkerClick(marker, c)}
          name={'Current location'}
          icon={{
            url: "./logo192.png",
            anchor: new google.maps.Point(10, 10),
            scaledSize: new google.maps.Size(20, 20)
          }}
        />)
      }
      {
        citizens.map((c, index) => <Polygon
          options={{ strokeOpacity: 1, strokeColor: getPriorityColor(c.sisben), fillColor: getPriorityColor(c.sisben)}}
          paths={generatePolygonPoints(c.location, 0.4)}
          key={index}
        />)
      }
        <InfoWindow onClose={onInfoWindowClose} visible={!!infoMarker} marker={infoMarker} >
          <div className='infoWindowContainer'>
            <h3>{selectedCitizen.first_name} {selectedCitizen.last_name}</h3>
            <div className="info-item">
              <strong>Cédula: </strong>
              <span>{selectedCitizen.document_number}</span>
            </div>
            <div className="info-item">
              <strong>Celular: </strong>
              <span>{selectedCitizen.cellphone_number}</span>
            </div>
            <div className="info-item">
             <strong>Sisben: </strong>
              <span>{selectedCitizen.sisben}</span>
            </div>
            <div className="info-action">
              <Button color="primary" variant="contained">Ver población</Button>
            </div>
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
