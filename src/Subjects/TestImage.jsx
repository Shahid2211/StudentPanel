import { Box ,Grid} from '@mui/material'
import React from 'react'

export default function TestImage() {
  return (
    <Box sx={{display:"flex",justifyContent:"center",alignItems:'center'}}>
      <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap', // important to allow wrapping
        gap: 2,
      }}
    >
      {['Hi', 'By', 'Hello', 'Byy'].map((item) => (
        <Box
          key={item}
          sx={{
            bgcolor: 'blue',
            color: 'white',
            width:'200px',
            height: '100px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexBasis: {
              xs: '100%',
              sm: '50%',
              md: '33.33%',
              lg: '25%',
            },
          }}
        >
          Box {item}
        </Box>
      ))}
    </Box> 
    <Box>
      <Box sx={{display:'flex',justifyContent:'center',flexBasis:{xs:'100%',sm:'50%',lg:"33.33%",xl:"25%"}}}>Help</Box>
      <Box sx={{display:'flex',justifyContent:'center',flexBasis:{xs:'100%',sm:'50%',lg:"33.33%",xl:"25%"}}}>Good</Box>
    </Box>
{/* <Grid container spacing={2} sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
  <Grid item xs={6} sm={6} md={4}><Box sx={{bgcolor:'red',width:'200px',height:'100px'}}>Left</Box></Grid>
  <Grid item xs={6} sm={6} md={4}><Box sx={{bgcolor:'red',width:'200px',height:'100px'}}>Right</Box></Grid>
  <Grid item xs={6} sm={6} md={4}><Box sx={{bgcolor:'red',width:'200px',height:'100px'}}>Top</Box></Grid>
  <Grid item xs={6} sm={6} md={4}><Box sx={{bgcolor:'red',width:'200px',height:'100px'}}>Bottom</Box></Grid>
</Grid> */}

    </Box>
  )
}
