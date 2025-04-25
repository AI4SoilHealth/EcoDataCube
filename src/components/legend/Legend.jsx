import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../AppContext";
import { Box, CircularProgress, Paper, Stack, Tooltip, useTheme } from "@mui/material";
import $data from "../../services/$data";

function Legend({isSecond}) {
  const theme = useTheme();
  const { layer, layer2, layers, layers2 } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [entries, setEntries] = useState([]);

  const getLegend = async (url) => {
    try {
      setLoading(true);
      const data = await $data.getLegend(url);
      setEntries(data);
    } catch (error) {
      console.log(error);
      setEntries([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if(!isSecond) {
      const layerObj = layers.find(l => l.title === layer);
      getLegend(layerObj.gsStyle);
    } else {
      const layerObj = layers2.find(l => l.title === layer2);
      getLegend(layerObj.gsStyle);
    }
  
  }, [layer]);

  useEffect(() => {
    if(!isSecond) {
      const layerObj = layers.find(l => l.title === layer);
      getLegend(layerObj.gsStyle);
    } else {
      const layerObj = layers2.find(l => l.title === layer2);
      getLegend(layerObj.gsStyle);
    }
  
  }, [layer2]);

  if (loading) {
    return (
      <Stack className="backdrop-blur" sx={{padding: '6px 5px', height: '180px', borderRadius: 0, width: '40px', background: theme.palette.primary.main, position: 'absolute', left: isSecond ? 'auto' : '7px', right: isSecond ? '7px' : 'auto', top: '50%', transform: 'translateY(-50%)' }} justifyContent="center" alignitems="center" component={Paper} elevation={5}>
        {loading && <CircularProgress size={30} color="secondary" sx={{ margin: '0 auto' }} />}
      </Stack>
    )
  }

  return (
    <Stack className="backdrop-blur" sx={{ padding: '6px 5px', height: '180px', borderRadius: 0, width: '40px', background: theme.palette.primary.main, position: 'absolute', left: isSecond ? 'auto' : '7px', right: isSecond ? '7px' : 'auto', top: '50%', transform: 'translateY(-50%)' }} justifyContent="center" alignitems="center" component={Paper} elevation={5}>
      {entries.map((entry, index) => {
        return <Box key={index} sx={{position: 'relative', '&:hover': { outline: '2px solid gray', cursor: 'pointer', '&::after': {
            content: `"${entry.label}"`,
            position: 'absolute',
            top: '50%', left: isSecond ? 'auto' : 'calc(100% + 14px)', right: isSecond ? 'calc(100% + 14px)' : 'auto', transform: 'translateY(-50%)',
            width: 'auto',
            whiteSpace: 'nowrap',
            background: "rgba(0, 0, 0, .7)",
            color: theme.palette.secondary.main,
            className: 'backdrop-blur',
            textAlign: 'center',
            padding: '3px 5px',
            borderRadius: '4px',
            fontSize: '12px'

          } }, background: entry.color, width: '100%', flex: '1 1 auto' }}></Box>
      })}
    </Stack>
  )

}

export default Legend;