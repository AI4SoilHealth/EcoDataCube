import { Avatar, Stack, Typography, useTheme } from "@mui/material";

function Help(props) {
  const theme = useTheme();

  return (
    <Stack spacing={1}>
      <Typography color="secondary" fontWeight="bold" fontSize={20}>Shortcut Keys</Typography>
      <Stack direction={"row"} spacing={2} alignItems="center">
        <Avatar sx={{background: theme.palette.secondary.main, color: "#000"}}>
          /
        </Avatar>
        <Typography color="secondary" fontWeight="bold">Search Location</Typography>
      </Stack>
      <Stack direction={"row"} spacing={2} alignItems="center">
        <Avatar sx={{background: theme.palette.secondary.main, color: "#000"}}>
          b
        </Avatar>
        <Typography color="secondary" fontWeight="bold">Basemaps Tab</Typography>
      </Stack>
      <Stack direction={"row"} spacing={2} alignItems="center">
        <Avatar sx={{background: theme.palette.secondary.main, color: "#000"}}>
          l
        </Avatar>
        <Typography color="secondary" fontWeight="bold">Layers Tab</Typography>
      </Stack>
      <Stack direction={"row"} spacing={2} alignItems="center">
        <Avatar sx={{background: theme.palette.secondary.main, color: "#000"}}>
          g
        </Avatar>
        <Typography color="secondary" fontWeight="bold">Support Tab</Typography>
      </Stack>
      <Stack direction={"row"} spacing={2} alignItems="center">
        <Avatar sx={{background: theme.palette.secondary.main, color: "#000"}}>
          m
        </Avatar>
        <Typography color="secondary" fontWeight="bold">Mastodon Feed</Typography>
      </Stack>
      <Stack direction={"row"} spacing={2} alignItems="center">
        <Avatar sx={{background: theme.palette.secondary.main, color: "#000"}}>
          s
        </Avatar>
        <Typography color="secondary" fontWeight="bold">Share Tab</Typography>
      </Stack>
      <Stack direction={"row"} spacing={2} alignItems="center">
        <Avatar sx={{background: theme.palette.secondary.main, color: "#000"}}>
          h
        </Avatar>
        <Typography color="secondary" fontWeight="bold">Help Tab</Typography>
      </Stack>
      <Stack direction={"row"} spacing={2} alignItems="center">
        <Avatar sx={{background: theme.palette.secondary.main, color: "#000"}}>
          c
        </Avatar>
        <Typography color="secondary" fontWeight="bold">Toggle Compare Mode</Typography>
      </Stack>
      <Stack direction={"row"} spacing={2} alignItems="center">
        <Avatar sx={{background: theme.palette.secondary.main, color: "#000"}}>
          +
        </Avatar>
        <Typography color="secondary" fontWeight="bold">Zoom In</Typography>
      </Stack>
      <Stack direction={"row"} spacing={2} alignItems="center">
        <Avatar sx={{background: theme.palette.secondary.main, color: "#000"}}>
          -
        </Avatar>
        <Typography color="secondary" fontWeight="bold">Zoom Out</Typography>
      </Stack>
    </Stack>
  )
}

export default Help;