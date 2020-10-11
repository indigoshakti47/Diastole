import React, { useEffect, useState } from 'react'
import MapContainer from '../components/MapContainer'
import fire from '../fire'

export default function Map () {
  const [citizens, setCitizens] = useState([])
  useEffect(() => {
    let citizensRef = fire.firestore().collection('citizens')
    citizensRef.orderBy("sisben").limit(5).get()
      .then(function (querySnapshot) {
        const people = []
        querySnapshot.forEach((doc) => people.push(doc.data()));
        setCitizens(people);
      })
  }, [])
  return (
    <MapContainer citizens={citizens} />
  )
}
