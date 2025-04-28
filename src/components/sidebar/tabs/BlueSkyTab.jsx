import { Box, Typography } from "@mui/material";

function BlueSkyTab(props) {
  return (
    <Box sx={{width: '100%', '& *': {fontSize: '12px !important'}, '& .text-slate-500.dark:text-slate-400.text-sm': {
      display: 'none !important',
      width: '100px !important'
    }}}>
      <Typography textAlign="center" variant="h6" sx={{fontSize:'20px !important'}} color="secondary" >BlueSky Feed</Typography>
    <bsky-embed
      username="opengeohub.bsky.social"
      mode="dark"
      limit="5"
      link-target="_blank"
      load-more="true"
      // disable-styles="false"
      custom-styles="img.rounded-full { display: none; } .flex > div { max-width: 100%; } .whitespace-pre-wrap { word-wrap: break-word;} span.text-slate-500.dark:text-slate-400.text-sm {font-size: 11px !important}"      // date-format='{"type":"absolute","locale":"en","options":{"year":"numeric","month":"short","day":"numeric"}}'
    >
    </bsky-embed>

    </Box>
  )
}

export default BlueSkyTab;