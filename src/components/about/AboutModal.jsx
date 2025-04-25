import { Close } from "@mui/icons-material";
import { Dialog, DialogContent, DialogTitle, IconButton, Stack, Tab, Tabs, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import AboutTab from "./AboutTab";
import LegalTab from "./LegalTab";
import Disclaimer from "./Disclaimer";
import DataAccess from "./DataAccess";

function AboutModal({open, setAbout}) {
  const theme = useTheme();
  const [tab, setTab] = useState(1);

  const renderAbout = () => {
    return <AboutTab />
  }

  const renderLegal = () => {
    return <LegalTab />
  }

  const renderDisclaimer = () => {
    return <Disclaimer />
  }

  const renderDataAccess = () => {
    return <DataAccess />
  }


  return (
    <Dialog
    fullWidth
    maxWidth='md'
    className="backdrop-blur"
    sx={{background: 'transparent !important','& .MuiDialog-paper': {borderRadius: 0, background: `${theme.palette.primary.main} !important`, backdropFilter: 'blur(10px)'}}}
      open={open}
      onClose={() => setAbout(false)}
    >
      <DialogTitle className="backdrop-blur" sx={{background: 'transparent !important'}} color="primary">
        <Stack direction={'row'} alignItems={"center"} justifyContent={"space-between"}>
          <Typography variant="h6" color="secondary">Info</Typography>
          <IconButton onClick={() => setAbout(false)} color="secondary"><Close /></IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent className="backdrop-blur" sx={{background: 'transparent'}}>
        <Tabs value={tab} onChange={(evt,val) => setTab(val)} sx={{minHeight: 'unset', '& .MuiTabs-indicator': {background: `${theme.palette.selected.main} !important`, '& .Mui-selected' : {color: `${theme.palette.selected.main} !important`}}, '& .MuiTab-root': {minHeight: 'unset', minWidth: 'unset', padding: '7px', fontSize: '12px'}}}>
          <Tab value={1} color="secondary" sx={{color: tab === 1 ? `${theme.palette.selected.main} !important` : '#fff !important'}} label="About" />
          <Tab value={2} color="secondary" sx={{color: tab === 2 ? `${theme.palette.selected.main} !important` : '#fff !important'}} label="Legal" />
          <Tab value={3} color="secondary" sx={{color: tab === 3 ? `${theme.palette.selected.main} !important` : '#fff !important'}} label="Disclaimer" />
          <Tab value={4} color="secondary" sx={{color: tab === 4 ? `${theme.palette.selected.main} !important` : '#fff !important'}} label="Data Access" />
        </Tabs>

        {tab === 1 && renderAbout()}
        {tab === 2 && renderLegal()}
        {tab === 3 && renderDisclaimer()}
        {tab === 4 && renderDataAccess()}

      </DialogContent>
    </Dialog>
  );
}

export default AboutModal;