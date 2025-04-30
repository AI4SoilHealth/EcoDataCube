import { Add, Bookmark, Fullscreen, GitHub, Home, Layers, Map, MyLocation, PieChart, Public, QuestionMark, Remove, Share, } from "@mui/icons-material";
import { ButtonGroup, IconButton, Paper, useTheme } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../../AppContext";


const mastodonIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill='#fff' d="M433 179.1c0-97.2-63.7-125.7-63.7-125.7-62.5-28.7-228.6-28.4-290.5 0 0 0-63.7 28.5-63.7 125.7 0 115.7-6.6 259.4 105.6 289.1 40.5 10.7 75.3 13 103.3 11.4 50.8-2.8 79.3-18.1 79.3-18.1l-1.7-36.9s-36.3 11.4-77.1 10.1c-40.4-1.4-83-4.4-89.6-54a102.5 102.5 0 0 1 -.9-13.9c85.6 20.9 158.7 9.1 178.8 6.7 56.1-6.7 105-41.3 111.2-72.9 9.8-49.8 9-121.5 9-121.5zm-75.1 125.2h-46.6v-114.2c0-49.7-64-51.6-64 6.9v62.5h-46.3V197c0-58.5-64-56.6-64-6.9v114.2H90.2c0-122.1-5.2-147.9 18.4-175 25.9-28.9 79.8-30.8 103.8 6.1l11.6 19.5 11.6-19.5c24.1-37.1 78.1-34.8 103.8-6.1 23.7 27.3 18.4 53 18.4 175z" /></svg>
const blueskyIcon = <svg fill="none" viewBox="0 0 64 57" width="20" style={{ width: "20px", height: "20px" }}><path fill="#ffffff" d="M13.873 3.805C21.21 9.332 29.103 20.537 32 26.55v15.882c0-.338-.13.044-.41.867-1.512 4.456-7.418 21.847-20.923 7.944-7.111-7.32-3.819-14.64 9.125-16.85-7.405 1.264-15.73-.825-18.014-9.015C1.12 23.022 0 8.51 0 6.55 0-3.268 8.579-.182 13.873 3.805ZM50.127 3.805C42.79 9.332 34.897 20.537 32 26.55v15.882c0-.338.13.044.41.867 1.512 4.456 7.418 21.847 20.923 7.944 7.111-7.32 3.819-14.64-9.125-16.85 7.405 1.264 15.73-.825 18.014-9.015C62.88 23.022 64 8.51 64 6.55c0-9.818-8.578-6.732-13.873-2.745Z"></path></svg>
const zenodoIcon = <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256.000000 256.000000" preserveAspectRatio="xMidYMid meet"> <g transform="translate(0.000000,256.000000) scale(0.100000,-0.100000)" fill="#ffffff" stroke="none"> <path d="M1740 2200 c-118 -16 -233 -64 -320 -133 l-44 -36 -12 45 c-6 24 -19 53 -30 65 -45 50 -38 49 -601 49 -506 0 -529 -1 -560 -20 -64 -39 -88 -111 -57 -175 36 -76 28 -75 486 -75 224 0 409 -3 411 -8 3 -4 -203 -288 -458 -631 -255 -343 -466 -633 -469 -645 -3 -11 -6 -52 -6 -89 0 -82 20 -131 64 -158 29 -18 61 -19 601 -19 554 0 571 1 603 20 19 12 40 37 49 58 8 20 17 39 19 41 2 2 25 -10 51 -27 116 -75 224 -106 363 -105 257 1 466 133 586 368 57 113 47 188 -29 236 -42 26 -108 21 -144 -12 -14 -13 -41 -55 -60 -92 -44 -88 -98 -146 -171 -185 -199 -106 -433 -30 -534 176 -30 61 -33 76 -37 179 l-3 113 468 0 c525 0 520 0 557 70 17 32 18 53 13 215 -11 308 -35 403 -141 537 -135 172 -377 269 -595 238z m225 -291 c72 -27 135 -77 177 -141 54 -81 68 -133 68 -253 l0 -105 -386 0 -386 0 4 123 c3 109 7 128 32 180 89 184 299 268 491 196z m-776 -1074 c7 -22 30 -75 51 -117 l39 -78 -425 0 c-233 0 -424 3 -424 6 0 3 165 228 368 500 l367 495 6 -383 c4 -267 9 -395 18 -423z" /> </g> </svg>
const zoteroIcon = <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet"> <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#ffffff" stroke="none"> <path d="M1440 3620 l0 -240 740 0 c407 0 740 -2 740 -6 0 -3 -322 -388 -716 -857 -393 -469 -725 -870 -737 -892 -28 -52 -29 -155 -3 -205 25 -49 64 -88 111 -113 l40 -22 1033 -3 1032 -2 0 240 0 240 -741 2 -741 3 726 864 c600 715 728 873 742 914 45 135 -42 280 -185 307 -34 6 -423 10 -1047 10 l-994 0 0 -240z" /> </g> </svg>;

function NavigationBar() {
  const theme = useTheme();
  const { sidebar, tab, setState } = useContext(AppContext);

  const handleClick = (val) => {
    if (tab != val) {
      setState((prev) => ({ ...prev, tab: val, sidebar: true }));
    } else {
      setState((prev) => ({ ...prev, tab: '', sidebar: false }));
    }
  }

  return (
    <ButtonGroup className={`backdrop-blur navigation-bar${sidebar ? ' navigation-bar-opened' : ''}`} component={Paper} elevation={5} sx={{ background: theme.palette.primary.main }} orientation="vertical">
      <IconButton onClick={() => handleClick('basemaps')} sx={{
        '&:hover': {
          background: theme.palette.selected.main + '99'
        },
        background: tab === 'basemaps' ? theme.palette.selected.main : 'transparent', borderRadius: 0
      }} color="secondary"><Map color="secondary" /></IconButton>
      <IconButton onClick={() => handleClick('layers')} sx={{
        '&:hover': {
          background: theme.palette.selected.main + '99'
        },
        background: tab === 'layers' ? theme.palette.selected.main : 'transparent', borderRadius: 0
      }} color="secondary"><Layers color="secondary" /></IconButton>
      <IconButton onClick={() => handleClick('github')} sx={{
        '&:hover': {
          background: theme.palette.selected.main + '99'
        },
        background: tab === 'github' ? theme.palette.selected.main : 'transparent', borderRadius: 0
      }} color="secondary"><GitHub color="secondary" /></IconButton>
      <IconButton onClick={() => handleClick('mastodon')} sx={{
        '&:hover': {
          background: theme.palette.selected.main + '99'
        },
        background: tab === 'mastodon' ? theme.palette.selected.main : 'transparent', borderRadius: 0
      }} color="secondary">{mastodonIcon}</IconButton>
      <IconButton onClick={() => handleClick('bluesky')} sx={{
        '&:hover': {
          background: theme.palette.selected.main + '99'
        },
        background: tab === 'bluesky' ? theme.palette.selected.main : 'transparent', borderRadius: 0
      }} color="secondary">{blueskyIcon}</IconButton>
      <IconButton onClick={() => handleClick('zenodo')} sx={{
        '&:hover': {
          background: theme.palette.selected.main + '99'
        },
        background: tab === 'zenodo' ? theme.palette.selected.main : 'transparent', borderRadius: 0
      }} color="secondary">{zenodoIcon}</IconButton>
      <IconButton onClick={() => handleClick('zotero')} sx={{
        '&:hover': {
          background: theme.palette.selected.main + '99'
        },
        background: tab === 'zotero' ? theme.palette.selected.main : 'transparent', borderRadius: 0
      }} color="secondary">{zoteroIcon}</IconButton>
      <IconButton onClick={() => handleClick('share')} sx={{
        '&:hover': {
          background: theme.palette.selected.main + '99'
        },
        background: tab === 'share' ? theme.palette.selected.main : 'transparent', borderRadius: 0
      }} color="secondary"><Share color="secondary" /></IconButton>

      {/* <IconButton onClick={() => handleClick('bookmark')} sx={{
        '&:hover': {
          background: theme.palette.selected.main + '99'
        },
        background: tab === 'bookmark' ? theme.palette.selected.main : 'transparent', borderRadius: 0}} color="secondary"><Bookmark  color="secondary"/></IconButton> */}
      <IconButton onClick={() => handleClick('help')} sx={{
        '&:hover': {
          background: theme.palette.selected.main + '99'
        },
        background: tab === 'help' ? theme.palette.selected.main : 'transparent', borderRadius: 0
      }} color="secondary"><QuestionMark color="secondary" /></IconButton>
      <IconButton onClick={() => {
        setState(current => ({...current, statsModal: true}));
      }} sx={{
        '&:hover': {
          background: theme.palette.selected.main + '99'
        },
        background: 'transparent', borderRadius: 0
      }} color="secondary"><PieChart /></IconButton>
    </ButtonGroup>
  )
}

export default NavigationBar;