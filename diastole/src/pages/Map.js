import React, { useEffect, useState } from 'react'
import MapContainer from '../components/MapContainer'
import fire from '../fire'

export default function Map() {
  const [citizens, setCitizens] = useState([])
  useEffect(() => {
    fire.firestore().collection('citizens').limit(5).get()
    .then(function(querySnapshot) {
      const people = []
      querySnapshot.forEach((doc) => people.push(doc.data()));
      console.log(people)
      setCitizens(people);
  })
  }, [])
  return (
     citizens.length && <MapContainer citizens={citizens} />
  )
}
