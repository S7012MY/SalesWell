import { useEffect, useState } from 'react'
import {
  Box,
  Container,
  Divider,
  Grid,
  Grow,
  Paper,
  Typography,
} from '@mui/material'

import CustomError from '../../../components/CustomError'
import ProfileInfo from '../../../components/prospects/ProfileInfo'


// use this function to get the 'id' parameter from the url
export async function getServerSideProps({ params }) {
  return { props: { id: String(params?.id) } }
}

function ProspectProfile(props) {
  const [prospect, setProspect] = useState({
    name: "--",
    mail: "--",
    phone: "--",
    fb: "--",
  })
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch('/api/prospect/get-by-key?key=id&value=' + props.id, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        // the response will be received as an array,
        // but we only need the first object
        setIsLoading(false)
        if (!response[0]) {
          setHasError(true)
        } else {
          setProspect(response[0])
        }
      })
  }, [])

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ fontSize: '2rem', marginTop: '2rem' }}>
            Page is Loading...
        </Box>
      </Box>
    )
  }  
  if (hasError) {
    return (
        <CustomError
          title="User not found"
          message="The user you are searching for does not exist."
        />
    )
  } 
  return (
    <Paper sx={{ p: 1, margin: '2%' }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <ProfileInfo prospect={prospect} />
        </Grid>
        <Grid item>
          <Divider sx={{ height: '100%' }} orientation="vertical" />
        </Grid>
        <Grid item xs>
          <Typography gutterBottom variant="h6">
            Notes
          </Typography>
          <Divider sx={{ width: 'auto' }} orientation="horizontal" />
        </Grid>
      </Grid>
    </Paper>
  )
}

export default ProspectProfile
