import { DragHandle } from "@mui/icons-material";
import { Box, Fab, IconButton, Slider, SliderThumb, Stack, Typography, useTheme } from "@mui/material";


function AirbnbThumbComponent(props) {
  const { children, ...other } = props;
  return (
    <SliderThumb {...other}>
      {children}
      <Fab sx={{ background: '#000 !important', color: "#fff", width: '40px !important', height: '40px !important' }}><DragHandle /></Fab>
    </SliderThumb>
  );
}

function Comparison(props) {
  const theme = useTheme();

  return (
    <Box sx={{ position: 'fixed', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: '100%', height: 0, zIndex: 10000 }}>
      <Slider min={0} max={100} step={1} value={props.swipe} onChange={(e) => props.setSwipe(e.target.value)} sx={{
        width: '100%', 
        '&.MuiSlider-root ': {
          height: '0 !important',
          padding: '0 !important',
        },
        '& .MuiSlider-thumb': {
          height: 40,
          width: 40,
        },
        '& .MuiSlider-track': {height: '0 !important', color: 'transparent'},
        '& .MuiSlider-rail': {height: 0},
      }} slots={{ thumb: AirbnbThumbComponent }} />
    </Box>
  )
}

export default Comparison;