import { Box, Stack, useTheme } from "@mui/material";
import { useContext } from "react";
import {AppContext} from '../../AppContext';

function Footer(props) {
  const theme = useTheme();
  const {setState} = useContext(AppContext);
  return (
    <Stack sx={{ position: 'absolute', bottom: 0, height: '45px', width: '100%', padding: '0 7px', background: theme.palette.primary.main }} className="backdrop-blur" direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
      <Stack direction="row" spacing={0} alignItems="center">
        <span style={{ fontSize: '12px', color: '#fff' }}>&copy;EcoDataCube</span>
        <Box sx={{display: {xs: 'none', sm: 'block'}}} component={'a'} href="https://ai4soilhealth.eu/" target="_blank"><img src="/ai4.svg" width="150"/></Box>
        <Box sx={{display: {xs: 'none', sm: 'block'}}} component={'a'} href="https://earthmonitor.org/" target="_blank"><img src="/oem.webp" height="25" /></Box>
      </Stack>
      <Stack direction="row" spacing={1} alignItems="center">
      <a style={{fontSize: '12px', fontWeight: 'bold', color: theme.palette.selected.main, textDecoration: 'none'}} href="https://stac.ecodatacube.eu/" target="_blank">STAC</a>
      <a onClick={() => setState(current => ({...current, about: true}))} style={{fontSize: '12px', fontWeight: 'bold', color: theme.palette.selected.main, textDecoration: 'none', cursor: 'pointer'}}>About</a>
      <a onClick={() => setState(current => ({...current, credits: true}))} style={{fontSize: '12px', fontWeight: 'bold', color: theme.palette.selected.main, textDecoration: 'none', cursor: 'pointer'}}>Credits</a>
      <span style={{fontSize: '12px', fontWeight: 'bold', color: '#fff'}}>Powered by: <a style={{color: theme.palette.selected.main, textDecoration: 'none'}} href="https://gilab.rs/" target="_blank">GILAB</a></span>

      </Stack>
    </Stack>
  )
}

export default Footer;