import { Add, Bookmark, Fullscreen, GitHub, Home, Layers, Map, MyLocation, Public, QuestionMark, Remove, Share,  } from "@mui/icons-material";
import { ButtonGroup, IconButton, Paper, useTheme } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../../AppContext";


const mastodonIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill='#fff' d="M433 179.1c0-97.2-63.7-125.7-63.7-125.7-62.5-28.7-228.6-28.4-290.5 0 0 0-63.7 28.5-63.7 125.7 0 115.7-6.6 259.4 105.6 289.1 40.5 10.7 75.3 13 103.3 11.4 50.8-2.8 79.3-18.1 79.3-18.1l-1.7-36.9s-36.3 11.4-77.1 10.1c-40.4-1.4-83-4.4-89.6-54a102.5 102.5 0 0 1 -.9-13.9c85.6 20.9 158.7 9.1 178.8 6.7 56.1-6.7 105-41.3 111.2-72.9 9.8-49.8 9-121.5 9-121.5zm-75.1 125.2h-46.6v-114.2c0-49.7-64-51.6-64 6.9v62.5h-46.3V197c0-58.5-64-56.6-64-6.9v114.2H90.2c0-122.1-5.2-147.9 18.4-175 25.9-28.9 79.8-30.8 103.8 6.1l11.6 19.5 11.6-19.5c24.1-37.1 78.1-34.8 103.8-6.1 23.7 27.3 18.4 53 18.4 175z"/></svg>

function NavigationBar() {
  const theme = useTheme();
  const {sidebar, tab, setState} = useContext(AppContext);

  const handleClick = (val) => {
    if(tab != val) {
      setState((prev) => ({...prev, tab: val, sidebar: true}));
    } else {
      setState((prev) => ({...prev, tab: '', sidebar: false}));
    }
  }

  return (
    <ButtonGroup className={`backdrop-blur navigation-bar${sidebar ? ' navigation-bar-opened' : ''}`} component={Paper} elevation={5} sx={{background: theme.palette.primary.main}}  orientation="vertical">
      <IconButton onClick={() => handleClick('basemaps')} sx={{
        '&:hover': {
          background: theme.palette.selected.main + '99'
        },
        background: tab === 'basemaps' ? theme.palette.selected.main : 'transparent', borderRadius: 0}} color="secondary"><Map  color="secondary"/></IconButton>
      <IconButton onClick={() => handleClick('layers')} sx={{
        '&:hover': {
          background: theme.palette.selected.main + '99'
        },
        background: tab === 'layers' ? theme.palette.selected.main : 'transparent', borderRadius: 0}} color="secondary"><Layers  color="secondary"/></IconButton>
      <IconButton onClick={() => handleClick('github')} sx={{
        '&:hover': {
          background: theme.palette.selected.main + '99'
        },
        background: tab === 'github' ? theme.palette.selected.main : 'transparent', borderRadius: 0}} color="secondary"><GitHub color="secondary"/></IconButton>
      <IconButton onClick={() => handleClick('mastodon')} sx={{
        '&:hover': {
          background: theme.palette.selected.main + '99'
        },
        background: tab === 'mastodon' ? theme.palette.selected.main : 'transparent', borderRadius: 0}} color="secondary">{mastodonIcon}</IconButton>
      <IconButton onClick={() => handleClick('share')} sx={{
        '&:hover': {
          background: theme.palette.selected.main + '99'
        },
        background: tab === 'share' ? theme.palette.selected.main : 'transparent', borderRadius: 0}} color="secondary"><Share color="secondary"/></IconButton>
      {/* <IconButton onClick={() => handleClick('bookmark')} sx={{
        '&:hover': {
          background: theme.palette.selected.main + '99'
        },
        background: tab === 'bookmark' ? theme.palette.selected.main : 'transparent', borderRadius: 0}} color="secondary"><Bookmark  color="secondary"/></IconButton> */}
      <IconButton onClick={() => handleClick('help')} sx={{
        '&:hover': {
          background: theme.palette.selected.main + '99'
        },
        background: tab === 'help' ? theme.palette.selected.main : 'transparent', borderRadius: 0}} color="secondary"><QuestionMark  color="secondary"/></IconButton>
    </ButtonGroup>
  )
}

export default NavigationBar;