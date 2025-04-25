import { useContext } from "react";
import { AppContext } from "../../AppContext";
import { Box, Button, ButtonGroup, Paper, Slider, Stack, Typography, useTheme } from "@mui/material";
import TimelineLayerSelector from "./TimelineLayerSelector";

function Timeline(props) {
  const theme = useTheme();
  const { layer, layer2, time, time2, layers, layers2, depth, depth2, sidebar, setState } = useContext(AppContext);
  const layerObj = layers.find(l => l.title === layer);
  const layerObj2 = layers2.find(l => l.title === layer2);
  const isEmbedd = window.location.pathname.indexOf('embed') > -1;
  if (props.comparison) {

    if (props.isSecond) {
      const lastMark2 = `& .MuiSlider-mark:nth-of-type(${layerObj2.range?.length + 2})`;
      return (
        <Stack spacing={1} className="backdrop-blur" component={Paper} sx={{ borderRadius: 0, padding: '5px', position: 'absolute', top: '54px', right: '7px', background: theme.palette.primary.main, minWidth: '300px' }}>
          <TimelineLayerSelector isSecond />
          {layerObj2.range.length > 0 && <Box sx={{ padding: '0px 10px', }}>
            <Slider sx={{

              '& .MuiSlider-mark:nth-of-type(3)': {
                height: '20px !important',
                width: '3px',
                // borderRadius: '50%',
              }, [lastMark2]: {
                height: '20px !important',
                width: '3px',
                // borderRadius: '50%',
              }, '& .MuiSlider-mark': {
                height: '10px',
              }
            }} value={layerObj2.range.indexOf(time2)} onChange={(evt, value) => setState(current => ({ ...current, time2: layerObj2.range[value] }))} track={false} marks color="secondary" min={0} max={layerObj2.range.length - 1} step={1} />
          </Box>}
          {layerObj2.depths.length > 0 && <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box onClick={() => setState(current => ({ ...current, depth2: '0cm' }))} sx={{ '&:hover': { background: theme.palette.selected.main }, background: depth2 === '0cm' ? theme.palette.selected.main : 'transparent', transition: '.1s background linear', fontSize: '12px', padding: '3px 4px', width: '80px', textAlign: 'center', cursor: 'pointer', color: "#fff" }}>0–20 cm</Box>
            <Box onClick={() => setState(current => ({ ...current, depth2: '20cm' }))} sx={{ '&:hover': { background: theme.palette.selected.main }, background: depth2 === '20cm' ? theme.palette.selected.main : 'transparent', transition: '.1s background linear', fontSize: '12px', padding: '3px 4px', width: '80px', textAlign: 'center', cursor: 'pointer', color: "#fff" }}>20–50 cm</Box>
            <Box onClick={() => setState(current => ({ ...current, depth2: '50cm' }))} sx={{ '&:hover': { background: theme.palette.selected.main }, background: depth2 === '50cm' ? theme.palette.selected.main : 'transparent', transition: '.1s background linear', fontSize: '12px', padding: '3px 4px', width: '80px', textAlign: 'center', cursor: 'pointer', color: "#fff" }}>50–100 cm</Box>
            <Box onClick={() => setState(current => ({ ...current, depth2: '100cm' }))} sx={{ '&:hover': { background: theme.palette.selected.main }, background: depth2 === '100cm' ? theme.palette.selected.main : 'transparent', transition: '.1s background linear', fontSize: '12px', padding: '3px 4px', width: '80px', textAlign: 'center', cursor: 'pointer', color: "#fff" }}>100–200 cm</Box>
          </Stack>}
        </Stack>
      )
    }

    //COMPARE LEFT
    const lastMark = `& .MuiSlider-mark:nth-of-type(${layerObj.range.length + 2})`;
    return (
      <Stack spacing={1} className="backdrop-blur" component={Paper} sx={{ borderRadius: 0, padding: '5px', position: 'absolute', top: '54px', left: '54px', background: theme.palette.primary.main, minWidth: '300px' }}>
        <TimelineLayerSelector />
        {layerObj.range.length > 0 && <Box sx={{ padding: '0px 15px', }}>
          <Slider sx={{
            '& .MuiSlider-mark:nth-of-type(3)': {
              height: '20px !important',
              width: '3px',
              // borderRadius: '50%',
            }, [lastMark]: {
              height: '20px !important',
              width: '3px',
              // borderRadius: '50%',
            }, '& .MuiSlider-mark': {
              height: '10px',
            }
          }} value={layerObj.range.indexOf(time)} onChange={(evt, value) => setState(current => ({ ...current, time: layerObj.range[value] }))} track={false} marks color="secondary" min={0} max={layerObj.range.length - 1} step={1} />
        </Box>}
        {layerObj.depths.length > 0 && <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box onClick={() => setState(current => ({ ...current, depth: '0cm' }))} sx={{ '&:hover': { background: theme.palette.selected.main }, background: depth === '0cm' ? theme.palette.selected.main : 'transparent', transition: '.1s background linear', fontSize: '12px', padding: '3px 4px', width: '80px', textAlign: 'center', cursor: 'pointer', color: "#fff" }}>0–20 cm</Box>
          <Box onClick={() => setState(current => ({ ...current, depth: '20cm' }))} sx={{ '&:hover': { background: theme.palette.selected.main }, background: depth === '20cm' ? theme.palette.selected.main : 'transparent', transition: '.1s background linear', fontSize: '12px', padding: '3px 4px', width: '80px', textAlign: 'center', cursor: 'pointer', color: "#fff" }}>20–50 cm</Box>
          <Box onClick={() => setState(current => ({ ...current, depth: '50cm' }))} sx={{ '&:hover': { background: theme.palette.selected.main }, background: depth === '50cm' ? theme.palette.selected.main : 'transparent', transition: '.1s background linear', fontSize: '12px', padding: '3px 4px', width: '80px', textAlign: 'center', cursor: 'pointer', color: "#fff" }}>50–100 cm</Box>
          <Box onClick={() => setState(current => ({ ...current, depth: '100cm' }))} sx={{ '&:hover': { background: theme.palette.selected.main }, background: depth === '100cm' ? theme.palette.selected.main : 'transparent', transition: '.1s background linear', fontSize: '12px', padding: '3px 4px', width: '80px', textAlign: 'center', cursor: 'pointer', color: "#fff" }}>100–200 cm</Box>
        </Stack>}
      </Stack>
    );
  }


  if (layerObj.range.length === 0) {
    return null;
  }

  const lastMark = `& .MuiSlider-mark:nth-of-type(${layerObj.range.length + 2})`;
  return (
    <>

      <Stack sx={{ position: 'absolute', bottom: { xs: isEmbedd ? '80px' : '170px', md: '80px' }, right: { xs: '7px', md: sidebar ? '327px' : '7px' }, width: { xs: 'calc(100% - 14px)', md: '400px' } }} >
        <Paper elevation={5} className="backdrop-blur" sx={{ borderRadius: 0, margin: '0 auto', background: theme.palette.primary.main, padding: '5px' }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            {/* <Typography sx={{opacity: .5}} color="secondary" fontSize="10px">{layerObj.rangeLabels[layerObj.range.indexOf(time) - 1]}</Typography> */}
            <Typography color="secondary" fontWeight="bold" fontSize="12px">{layerObj.rangeLabels[layerObj.range.indexOf(time)]}</Typography>
            {/* <Typography sx={{opacity: .5}} color="secondary" fontSize="10px">{layerObj.rangeLabels[layerObj.range.indexOf(time) + 1]}</Typography> */}

          </Stack>
        </Paper>

        <Stack direction="row" spacing={1} component={Paper} elevation={5} className="backdrop-blur" sx={{ borderRadius: 0, background: theme.palette.primary.main, padding: '10px 20px', }}>
          <Slider sx={{
            '& .MuiSlider-mark:nth-of-type(3)': {
              height: '20px !important',
              width: '3px',
              // borderRadius: '50%',
            }, [lastMark]: {
              height: '20px !important',
              width: '3px',
              // borderRadius: '50%',
            }, '& .MuiSlider-mark': {
              height: '10px',
            }
          }} value={layerObj.range.indexOf(time)} onChange={(evt, value) => setState(current => ({ ...current, time: layerObj.range[value] }))} track={false} marks color="secondary" min={0} max={layerObj.range.length - 1} step={1} />
        </Stack>

      </Stack>
      {layerObj.depths.length > 0 && (
        <Stack sx={{ position: 'absolute', bottom: { xs: '234px', md: '130px' }, right: { xs: '7px', md: sidebar ? '327px' : '7px' } }} >
          <ButtonGroup component={Paper} className="backdrop-blur" sx={{ background: theme.palette.primary.main, borderRadius: 0 }} orientation="vertical">
            <Button sx={{ p: '4px', textTransform: 'lowercase', borderRadius: 0, fontSize: '12px' }} onClick={() => setState(current => ({ ...current, depth: '0cm' }))} variant={depth === '0cm' ? "contained" : "text"} color={depth === '0cm' ? "selected" : "secondary"}>0–20 cm</Button>
            <Button sx={{ p: '4px', textTransform: 'lowercase', borderRadius: 0, fontSize: '12px' }} onClick={() => setState(current => ({ ...current, depth: '20cm' }))} variant={depth === '20cm' ? "contained" : "text"} color={depth === '20cm' ? "selected" : "secondary"}>20–50 cm</Button>
            <Button sx={{ p: '4px', textTransform: 'lowercase', borderRadius: 0, fontSize: '12px' }} onClick={() => setState(current => ({ ...current, depth: '50cm' }))} variant={depth === '50cm' ? "contained" : "text"} color={depth === '50cm' ? "selected" : "secondary"}>50–100 cm</Button>
            <Button sx={{ p: '4px', textTransform: 'lowercase', borderRadius: 0, fontSize: '12px' }} onClick={() => setState(current => ({ ...current, depth: '100cm' }))} variant={depth === '100cm' ? "contained" : "text"} color={depth === '100cm' ? "selected" : "secondary"}>100–200 cm</Button>
          </ButtonGroup>

        </Stack>
      )}
    </>
  )

}

export default Timeline;