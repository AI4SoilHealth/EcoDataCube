import { Button, IconButton, Paper, Stack, Typography, useTheme } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../../AppContext";
import { Compare, Download, Info } from "@mui/icons-material";

function LayerDetails(props) {
  const theme = useTheme();
  const { layer, time, depth, layers, setState } = useContext(AppContext);

  const layerObject = layers.filter(l => l.title === layer)[0];
  
  const createDownloadUrl = () => {
    if(layerObject.isVars) {
      window.open(layerObject.download.replace(/\.{(.*?)\}/, time), '_blank');
      return;
    }

    if(layerObject.depths.length > 0) {

      let formated = '0cm'

      if(depth === '0cm') {
        formated = 'b0cm..20cm'
      } else if(depth === '20cm') {
        formated = 'b20cm..50cm'
      } else if(depth === '50cm') {
        formated = 'b50cm..100cm'
      } else if(depth === '100cm') {
        formated = 'b100cm..200cm'
      } 

      window.open(layerObject.download.replace(/\{(.*?)\}/, formated).replace(/\{(.*?)\}/, time), '_blank')
      return;
    }
    
    if(layerObject.range.length > 0) {
      window.open(layerObject.download.replace(/\{(.*?)\}/, time), '_blank');
      return;
    }

    window.open(layerObject.download, '_blank');
  }
  const isEmbedd = window.location.pathname.indexOf('embed') > -1;

  return (
    <Stack className="backdrop-blur" sx={{ padding: '10px', borderRadius: 0, background: theme.palette.primary.main, position: 'absolute', left: '7px', bottom: isEmbedd ? '7px' : '80px', width: { xs: 'calc(100%  - 14px)', md: '320px' } }} component={Paper} elevation={5} spacing={1}>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
        <Typography title={layer} sx={{textOverflow: 'ellipsis', overflow: {xs: 'hidden', sm: 'auto'}, whiteSpace: {xs: 'nowrap', sm: 'initial'}}} fontSize="12px" color="secondary" fontWeight="bold">{layer}</Typography>
        {!isEmbedd && <Button onClick={() => setState(current => ({...current, comparison: true}))} sx={{minWidth: '90px'}} size="small" variant="text" color="selected" startIcon={<Compare fontSize="small" color="selected" />}><Typography fontSize="12px" color="selected" fontWeight="bold">Compare</Typography></Button>}
      </Stack>
      <Typography sx={{display: {xs: isEmbedd ? 'inline' : 'none', md: 'inline'}}} title={layerObject.description} fontSize="10px" variant="caption" color={theme.palette.secondary.main + '99'}>
        {layerObject.description.split(' ').filter((w,i) => i < 10).join(' ')}...
      </Typography>
      {!isEmbedd && <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
        <Button component={'a'} href={layerObject.metadata} target="_blank" size="small" sx={{fontSize: '11px'}} variant="contained" color="selected" startIcon={<Info />}>Metadata</Button>
        <Button onClick={createDownloadUrl}  size="small" sx={{fontSize: '11px', whiteSpace: 'nowrap'}} variant="contained" color="selected" startIcon={<Download />}> {layerObject.range.length > 0 ? layerObject.rangeLabels[layerObject.range.indexOf(time)] : 'Download'}</Button>
      </Stack>}

    </Stack>
  )
}

export default LayerDetails;