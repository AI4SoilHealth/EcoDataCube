import { Close } from "@mui/icons-material";
import { CircularProgress, Dialog, DialogContent, DialogTitle, IconButton, LinearProgress, List, ListItemButton, ListItemText, Stack, Tab, Tabs, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import StatsMap from "./StatsMap";
import $data from "../../services/$data";
import { Link } from "react-router-dom";

function StatsModal({ open, onClose }) {
  const theme = useTheme();

  const [tab, setTab] = useState('usage');
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
          <Typography variant="h6" color="secondary">{tab === 'usage' ? 'Usage Statistics' : 'Visitors Statistics'}</Typography>
          <IconButton onClick={onClose} color="secondary"><Close /></IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent className="backdrop-blur" sx={{ background: 'transparent' }}>
        <Tabs TabIndicatorProps={{
          sx: {
            backgroundColor: theme.palette.selected.main, // Custom color
          },
        }} sx={{
          mb: '20px',

          "& .MuiTab-root": {
            color: theme.palette.secondary.main, // Color for the selected tab
          },
          "& .MuiTab-root.Mui-selected": {
            color: theme.palette.selected.main, // Color for the selected tab
          },
        }} value={tab} onChange={(e, value) => setTab(value)}>
          <Tab value="usage" label="Datasets Access & Querying" />
          <Tab value="visitors" label="Visitors Statistics" />
        </Tabs>
        {tab === 'usage' && (
          <Stack spacing={2}>
            <Typography color="secondary">For EcoDataCube visitors statistics, check <Typography component="a" color="selected" href="https://plausible.earthmonitor.org/ecodatacube.eu" target="_blank">here</Typography></Typography>
            <Stack sx={{ minHeight: '400px', width: '100%' }} direction={{ xs: "column", sm: 'row' }} alignItems="flex-start" spacing={2}>
              {loading && <LinearProgress sx={{ textAlign: 'center', width: '100%' }} variant="indeterminate" color="primary" />}
              {!loading && layer && <>
                <StatsMap layer={layer} />

                <Stack spacing={1} sx={{ width: { xs: '100%', sm: '30%' } }}>
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
          </Stack>
        )}

        {tab === 'visitors' && (
          <>
            <iframe plausible-embed="true" src="https://plausible.earthmonitor.org/share/ecodatacube.eu?auth=Wo6KH8RJNrSPLjwy1dXeS&embed=true&theme=dark&background=transparent" scrolling="no" frameBorder="0" loading="lazy" style={{ width: '1px', minWidth: '100%', height: '1600px' }}></iframe>
            <div style={{ fontSize: '14px', paddingBottom: '14px' }}>Stats powered by <a target="_blank" style={{ color: '#4F46E5', textDecoration: 'underline' }} href="https://plausible.io">Plausible Analytics</a></div>

          </>
        )}

      </DialogContent>
    </Dialog>
  );
}

export default StatsModal;