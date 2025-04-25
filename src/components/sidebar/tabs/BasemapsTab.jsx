import { Paper, Stack, Typography, useTheme } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../../../AppContext";

function BasemapsTab(props) {
  const {base, setState} = useContext(AppContext);

  const theme = useTheme();
  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={2}>
        <Paper onClick={() => setState(current => ({...current, base: 'bing'}))} elevation={3} sx={{background: base === 'bing' ? theme.palette.selected.main : '#fff', padding: '3px', width: '96px', height: '86px', cursor: 'pointer' }}>
          <img src={'/bing_overview.png'} style={{ width: '90px', height: '80px' }} />
        </Paper>
        <Stack>
          <Typography fontSize="12px" color="secondary"><strong>BingMaps (Aerial)</strong></Typography>
          <Typography fontSize="11px" color="secondary">© 2025 Microsoft Corporation © 2025 Maxar © CNES(2025) Distribution Airbus DS © 2025 TomTom <a style={{color: theme.palette.selected.main}} href="https://www.microsoft.com/maps/product/terms.html" target="_blank">Terms of Use</a></Typography>
        </Stack>
      </Stack>
      <Stack direction="row" spacing={2}>
        <Paper onClick={() => setState(current => ({...current, base: 'otm'}))} elevation={3} sx={{background: base === 'otm' ? theme.palette.selected.main : '#fff', padding: '3px', width: '96px', height: '86px', cursor: 'pointer' }}>
          <img src={'/opentopomap_overview_grayscale.png'} style={{ width: '90px', height: '80px' }} />
        </Paper>
        <Stack>
          <Typography fontSize="12px" color="secondary"><strong>OpenTopoMap</strong></Typography>
          <Typography fontSize="11px" color="secondary">
            <a style={{color: theme.palette.selected.main}} href="https://openstreetmap.org/copyright" target="_blank">© OpenStreetMap</a> contributors,  
            <a style={{color: theme.palette.selected.main}} href="http://viewfinderpanoramas.org/" target="_blank">SRTM</a>,  
            <a style={{color: theme.palette.selected.main}} href="https://opentopomap.org/" target="_blank">© OpenTopoMap</a>,  
            <a style={{color: theme.palette.selected.main}} href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank">(CC-BY-SA)</a></Typography>
        </Stack>
      </Stack>
      <Stack direction="row" spacing={2}>
        <Paper onClick={() => setState(current => ({...current, base: 'osm'}))} elevation={3} sx={{background: base === 'osm' ? theme.palette.selected.main : '#fff', padding: '3px', width: '96px', height: '86px', cursor: 'pointer' }}>
          <img src={'/osm_overview.png'} style={{ width: '90px', height: '80px' }} />
        </Paper>
        <Stack>
          <Typography fontSize="12px" color="secondary"><strong>OpenStreetMap</strong></Typography>
          <Typography fontSize="11px" color="secondary"><a style={{color: theme.palette.selected.main}} href="https://openstreetmap.org/copyright" target="_blank">© OpenStreetMap</a> contributors</Typography>
        </Stack>

      </Stack>
      <Stack direction="row" spacing={2}>
        <Paper onClick={() => setState(current => ({...current, base: 'osm_gray'}))} elevation={3} sx={{background: base === 'osm_gray' ? theme.palette.selected.main : '#fff', padding: '3px', width: '96px', height: '86px', cursor: 'pointer' }}>
          <img className="ol-grayscale" src={'/osm_overview.png'} style={{ width: '90px', height: '80px' }} />
        </Paper>
        <Stack>
          <Typography fontSize="12px" color="secondary"><strong>OpenStreetMap (Grayscale)</strong></Typography>
          <Typography fontSize="11px" color="secondary"><a style={{color: theme.palette.selected.main}} href="https://openstreetmap.org/copyright" target="_blank">© OpenStreetMap</a> contributors</Typography>
        </Stack>
      </Stack>
      {/* <Stack direction="row" spacing={2}>
        <Paper onClick={() => setState(current => ({...current, base: 'rgb'}))} elevation={3} sx={{background: base === 'rgb' ? theme.palette.selected.main : '#fff', padding: '3px', width: '96px', height: '86px', cursor: 'pointer' }}>
          <img src={'/rgb.png'} style={{ width: '90px', height: '80px' }} />
        </Paper>
        <Stack>
          <Typography fontSize="12px" color="secondary"><strong>RGB Landsat (yearly)</strong></Typography>
          <Typography fontSize="11px" color="secondary">Landsat RGB time-series, derived by the median pixel values obtained between June 25 and September 12 on a specific year.</Typography>
        </Stack>
      </Stack> */}
    </Stack>
  )
}

export default BasemapsTab;