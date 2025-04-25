import { Add, Fullscreen, Grid3x3, Grid4x4, Home, LocationOff, LocationOn, MyLocation, PowerOff, Public, Remove, } from "@mui/icons-material";
import { ButtonGroup, IconButton, Paper, useTheme } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../../AppContext";
import $map from "../../services/$map";
import { fromLonLat } from "ol/proj";
import { initState } from "../../config/defaults";

function MapToolbar() {
  const { _3D, geolocation, comparison, setState } = useContext(AppContext);
  const theme = useTheme();

  const zoomToExtent = () => {
    $map.instance.getView().animate({zoom: initState.zoom, center: fromLonLat(initState.center), duration: 500 })
  }

  const zoomIn = () => {
    let currentZoom = $map.instance.getView().getZoom();

    if(currentZoom <= 19.5) {
      $map.instance.getView().animate({zoom: currentZoom + 0.5, duration: 250 })
    }
  }

  const zoomOut = () => {
    let currentZoom = $map.instance.getView().getZoom();

    if(currentZoom >= 4.5) {
      $map.instance.getView().animate({zoom: currentZoom - 0.5, duration: 250 })
    }
  }

  const goToHome = () => {
    window.history.replaceState('', 'EcoDataCube', window.location.origin);
    window.location.reload();
  }

  const myLocation = () => {
    setState(current => ({ ...current, geolocation: !geolocation }));
  }


  return (
    <ButtonGroup className="backdrop-blur" component={Paper} elevation={5} sx={{ borderRadius: 0, position: 'absolute', left: '7px', top: '54px', background: theme.palette.primary.main }} orientation={window.innerWidth < 600 ? 'horizontal' : 'vertical'}>
      <IconButton sx={{borderRadius: 0, '&:hover': {background: theme.palette.selected.main + '99'}}} onClick={goToHome} color="secondary"><Home /></IconButton>
      <IconButton sx={{borderRadius: 0, '&:hover': {background: theme.palette.selected.main + '99'}}} onClick={zoomToExtent} color="secondary"><Fullscreen /></IconButton>
      <IconButton sx={{borderRadius: 0, '&:hover': {background: theme.palette.selected.main + '99'}}} onClick={zoomIn} color="secondary"><Add /></IconButton>
      <IconButton sx={{borderRadius: 0, '&:hover': {background: theme.palette.selected.main + '99'}}} onClick={zoomOut} color="secondary"><Remove /></IconButton>
      <IconButton sx={{borderRadius: 0, background: geolocation ? theme.palette.selected.main : 'transparent', '&:hover': {background: theme.palette.selected.main + '99'}}} onClick={myLocation} color="secondary">
      {!geolocation && <LocationOn />}
      {geolocation && <LocationOff />}
      </IconButton>
      <IconButton sx={{borderRadius: 0, '&:hover': {background: theme.palette.selected.main + '99'}}} onClick={() => setState(current => ({ ...current, _3D: !_3D }))} color="secondary">
        {!_3D && <Public />}
        {_3D && <Grid4x4 />}
      </IconButton>
     {comparison && <IconButton sx={{borderRadius: 0, '&:hover': {background: theme.palette.selected.main + '99'}}} onClick={() => setState(current => ({ ...current, comparison: false }))} color="secondary">
        <PowerOff />
      </IconButton>}
    </ButtonGroup>
  )
}

export default MapToolbar;