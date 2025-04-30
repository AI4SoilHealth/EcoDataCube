import { Close } from "@mui/icons-material";
import { CircularProgress, Dialog, DialogContent, DialogTitle, IconButton, LinearProgress, List, ListItemButton, ListItemText, Stack, Tab, Tabs, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import StatsMap from "./StatsMap";
import $data from "../../services/$data";

function StatsModal({ open, onClose }) {
  const theme = useTheme();

  const [layer, setLayer] = useState();
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true)

  const getStats = async () => {
    try {
      const stats = await $data.getStats();
      setStats(stats);
      setLayer(stats[0]);

    } catch (err) {
      console.log(err)
    } finally {
      setTimeout(() => {
        setLoading(false);

      }, 500)
    }
  }
  useEffect(() => {
    getStats();
  }, [])

  return (
    <Dialog
      fullWidth
      maxWidth='lg'
      className="backdrop-blur"
      sx={{ background: 'transparent !important', '& .MuiDialog-paper': { borderRadius: 0, background: `${theme.palette.primary.main} !important`, backdropFilter: 'blur(10px)' } }}
      open={open}
      onClose={onClose}
    >
      <DialogTitle className="backdrop-blur" sx={{ background: 'transparent !important' }} color="primary">
        <Stack direction={'row'} alignItems={"center"} justifyContent={"space-between"}>
          <Typography variant="h6" color="secondary">User Statistics</Typography>
          <IconButton onClick={onClose} color="secondary"><Close /></IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent className="backdrop-blur" sx={{ background: 'transparent' }}>
        <Stack sx={{ minHeight: '400px', width: '100%' }} direction="row" alignItems="flex-start" spacing={2}>
          {loading && <LinearProgress sx={{ textAlign: 'center', width: '100%' }} variant="indeterminate" color="primary" />}
          {!loading && layer && <>
            <StatsMap layer={layer} />

            <Stack spacing={1} sx={{ width: '30%' }}>
              <Typography sx={{ pl: '15px' }} fontWeight="bold" color="secondary">Most Visited Datasets</Typography>
              <List dense>
                {stats.map((obj, index) => {
                  return (
                    <ListItemButton selected={layer.layer === obj.layer} key={index} onClick={() => { setLayer(obj) }}>
                      <ListItemText color="secondary" sx={{ '& span, & p': { color: '#fff' }, '&>span': { fontWeight: 'bold !important' } }} primary={obj.layer} secondary={`Number of queries: ${obj.access_count}`}>
                      </ListItemText>
                    </ListItemButton>
                  )
                })}
              </List>
            </Stack>
          </>}
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export default StatsModal;