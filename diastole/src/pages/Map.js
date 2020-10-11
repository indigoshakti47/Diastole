import React, { useEffect, useState } from 'react'
import { Box } from '@material-ui/core'
import MapContainer from '../components/MapContainer'
import fire from '../fire'
import "./Map.css"

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
    <Box className="Map" display="flex" height="100%" flexDirection="column">
      {
        citizens.length === 0 ? null : <MapContainer citizens={citizens} />
      }
    </Box>
  )
}
