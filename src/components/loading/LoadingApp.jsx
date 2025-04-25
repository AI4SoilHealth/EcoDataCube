import { CircularProgress, Stack, useTheme } from "@mui/material";

function LoadingApp(props) {
  const theme = useTheme();
  return (
    <Stack sx={{width: '100%', height: '100%', background: theme.palette.primary.main}} justifyContent="center" alignItems="center" spacing={4}>
      <img src={'/ecodatacube_logo_europe.svg'} width="300" />
      <CircularProgress color="secondary" />
    </Stack>
  )
}

export default LoadingApp;