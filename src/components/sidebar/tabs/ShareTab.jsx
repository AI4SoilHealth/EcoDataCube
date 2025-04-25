import { Alert, Box, Button, Grid, Snackbar, Stack, Typography, useTheme } from "@mui/material";
import { useContext, useState } from "react";
import { EmailIcon, EmailShareButton, FacebookIcon, FacebookShareButton, LinkedinIcon, LinkedinShareButton, TelegramIcon, TelegramShareButton, TwitterShareButton, ViberIcon, ViberShareButton, WhatsappIcon, WhatsappShareButton, XIcon } from "react-share";
import { AppContext } from "../../../AppContext";
import { Code, CopyAll, Html } from "@mui/icons-material";

function ShareTab(props) {
  const theme = useTheme();
  const { layer } = useContext(AppContext);
  const [show, setShow] = useState(false);
  const [code, setCode] = useState('');

  const copy = () => {
    setShow(false);
    navigator.clipboard.writeText(window.location.href);
    setShow(true);
  }

  const embed = () => {
    setShow(false);
    let embedCode = `
    <iframe src="${window.location.origin + '/embedd/' + window.location.search }" width="100%" height="100%" frameBorder="0" allowFullScreen></iframe>
  `;
    navigator.clipboard.writeText(embedCode);
    setShow(true);
    setCode(embedCode);
  }

  return (
    <Grid sx={{ '& path': { borderRadius: '4px !important' } }} container spacing={2} textAlign="center">
      <Grid size={12}>
        <Typography variant="h6" color="secondary">Share</Typography>
      </Grid>
      <Grid textAlign="center" size={{ xs: 4 }}>
        <LinkedinShareButton title={''} summary={''} children={<LinkedinIcon size="40px" />} source={window.location.href} url={window.location.href} />
      </Grid>
      <Grid textAlign="center" size={{ xs: 4 }}>
        <TwitterShareButton children={<XIcon size="40px" />} url={window.location.href} />
      </Grid>
      <Grid textAlign="center" size={{ xs: 4 }}>
        <FacebookShareButton children={<FacebookIcon size="40px" />} url={window.location.href} />
      </Grid>
      <Grid textAlign="center" size={{ xs: 4 }}>
        <ViberShareButton title="" children={<ViberIcon size="40px" />} url={window.location.href} />
      </Grid>
      <Grid textAlign="center" size={{ xs: 4 }}>
        <WhatsappShareButton title="" children={<WhatsappIcon size="40px" />} url={window.location.href} />
      </Grid>
      <Grid textAlign="center" size={{ xs: 4 }}>
        <EmailShareButton title="" children={<EmailIcon size="40px" />} url={window.location.href} />
      </Grid>

      <Grid size={12}>
        <Stack direction="row" justifyContent="center" spacing={2}>
          <Button variant="contained" color="selected" onClick={copy} startIcon={<CopyAll />}>Copy URL</Button>
          <Button variant="contained" color="selected" onClick={embed} startIcon={<Code />}>Embed app</Button>

        </Stack>

      </Grid>

      {code !== '' && <Grid item size={12} textAlign="left">
        <Box sx={{padding: '10px', border: '1px solid #fff'}}>
          <code style={{color: theme.palette.secondary.main, wordBreak: 'break-all'}}>{code}</code>
        </Box>
      </Grid>}

      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={show} autoHideDuration={3000} onClose={() => setShow(false)}>
        <Alert color="primary" onClose={() => setShow(false)}>Copied!</Alert>
      </Snackbar>

    </Grid>
  )
}

export default ShareTab;