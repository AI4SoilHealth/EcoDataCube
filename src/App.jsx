import { useEffect, useState } from 'react'
import './styles/main.scss';
import { createTheme, ThemeProvider, CssBaseline, Button, Paper, Stack } from '@mui/material';
import Map from './components/map/Map';
import MapToolbar from './components/map/MapToolbar';
import AppContextProvider from './AppContext';
import NavigationBar from './components/sidebar/NavigationBar';
import Sidebar from './components/sidebar/Sidebar';
import SearchLocation from './components/search/SearchLocation';
import { initState } from './config/defaults';
import LoadingApp from './components/loading/LoadingApp';
import Footer from './components/footer/Footer';
import $data from './services/$data';
import LayerDetails from './components/map/LayerDetails';
import Legend from './components/legend/Legend';
import Timeline from './components/timeline/Timeline';
import AboutModal from './components/about/AboutModal';
import CreditsModal from './components/about/CreditsModal';
import $params from './services/$params';
import {
  Route,
  Routes,
} from "react-router-dom";
import StatsModal from './components/stats/StatsModal';

const palette = {
  palette: {
    primary: {
      main: "#000000cc",

    },
    secondary: {
      main: "#ffffff",
    },
    selected: {
      main: '#EB4850',
      contrastText: "#fff",
    },
    disabled: "#D0D0D0"
  },
};

// import Plausible from 'plausible-tracker'



function App() {
  const theme = createTheme({
    ...palette, components: {
      MuiListItemButton: {
        styleOverrides: {
          root: {
            '&.Mui-selected': {
              background: '#EB4850',
              color: '#ffffff',
              ":hover": {
                background: '#EB4850',
              }
            },
            ":hover": {
              background: '#EB485099',
            }
          }
        }
      }
    }
  });

  const isEmbedd = window.location.pathname.indexOf('embed') > -1;
  const [state, setState] = useState({
    ...initState,
    mounted: false,
    about: false,
    credits: false,
    sidebar: !isEmbedd && window.innerWidth > 600 ? initState.sidebar : false,
    layers: [],
    layers2: [],
  });

  const getData = async () => {


    try {
      let total = await $data.getLayers(state.layer, state.opacity);
      let data = total.map(arr => arr[0]);
      let data2 = total.map(arr => arr[1]);

      let params = $params.format(window.location.search, data);
      data.map((l, i) => {
        l.tileLayer.setVisible(false);
        l.tileLayer.setOpacity(params.opacity / 100)
        if (l.title === params.layer) {
          l.tileLayer.setVisible(true);
          l.tileLayer.getSource().updateParams({ [l.timeDimension]: params.time });
        }
      });

      setState(current => ({ ...current, ...params, mounted: true, layers: data, layers2: data2 }));
    } catch (error) {

    } finally {
      setTimeout(() => {

        setState(current => ({
          ...current,
          loading: false,
        }));
      }, 1000)
    }
  }

  const initHotKeys = () => {
    document.addEventListener('keypress', (evt) => {

      //COMPARE HOT KEY
      if (evt.key === 'c') {
        if (window.innerWidth >= 768 && document.activeElement.tagName !== 'INPUT') {
          setState(current => ({ ...current, comparison: !current.comparison }));
          return
        }
      }

      //SEARCH HOT KEY
      if (evt.key === '/') {
        if (!state.comparison) {


          if (document.activeElement.tagName === 'INPUT' && document.activeElement.class !== 'search-prompt') {

          } else {
            setTimeout(() => {
              document.querySelector('.search-prompt input').focus()

            })
          }

          return
        }
      }

      //SIDEBAR HOT KEY
      if (evt.key === 'b') {
        if (!state.comparison && document.activeElement.tagName !== 'INPUT') {
          setState(current => ({
            ...current,
            sidebar: current.sidebar && current.tab === 'basemaps' ? false : true,
            tab: current.tab !== 'basemaps' ? 'basemaps' : null
          }));
          return
        }
      }

      if (evt.key === 'l') {
        if (!state.comparison && document.activeElement.tagName !== 'INPUT') {
          setState(current => ({
            ...current,
            sidebar: current.sidebar && current.tab === 'layers' ? false : true,
            tab: current.tab !== 'layers' ? 'layers' : null
          }));
          return
        }
      }

      if (evt.key === 'g') {
        if (!state.comparison && document.activeElement.tagName !== 'INPUT') {
          setState(current => ({
            ...current,
            sidebar: current.sidebar && current.tab === 'github' ? false : true,
            tab: current.tab !== 'github' ? 'github' : null
          }));
          return
        }
      }


      if (evt.key === 'm') {
        if (!state.comparison && document.activeElement.tagName !== 'INPUT') {
          setState(current => ({
            ...current,
            sidebar: current.sidebar && current.tab === 'mastodon' ? false : true,
            tab: current.tab !== 'mastodon' ? 'mastodon' : null
          }));
          return
        }
      }

      if (evt.key === 's') {
        if (!state.comparison && document.activeElement.tagName !== 'INPUT') {
          setState(current => ({
            ...current,
            sidebar: current.sidebar && current.tab === 'share' ? false : true,
            tab: current.tab !== 'share' ? 'share' : null
          }));
          return
        }
      }


      if (evt.key === 'h') {
        if (!state.comparison && document.activeElement.tagName !== 'INPUT') {
          setState(current => ({
            ...current,
            sidebar: current.sidebar && current.tab === 'help' ? false : true,
            tab: current.tab !== 'help' ? 'help' : null
          }));
          return
        }
      }
    })

  }

  useEffect(() => {

    initHotKeys();
    getData();

    return () => {
    }
  }, []);

  useEffect(() => {
    if (state.mounted) {
      $params.change(state);
    }
  }, [state.base, state.layer, state.zoom, state.opacity, JSON.stringify(state.center), state.time, state, state.depth])


  return (
    <AppContextProvider value={{ ...state, setState: setState }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={
            <>
              {state.loading && <LoadingApp />}
              {!state.loading && !state.comparison && <>

                <Map />
                <MapToolbar />
                <SearchLocation />
                <Legend />
                <LayerDetails />
                <Timeline />
                <NavigationBar />
                <Sidebar />
                <Footer />
              </>}

              {!state.loading && state.comparison && <>
                <CssBaseline />
                <Map />
                <MapToolbar />
                <SearchLocation />
                <Legend />
                <Legend isSecond />

                <Timeline comparison />
                <Timeline comparison isSecond />

                <Footer />
              </>}


              {state.about && <AboutModal open={state.about} setAbout={(bool) => setState(current => ({ ...current, about: bool }))} />}
              {state.credits && <CreditsModal open={state.credits} setCredits={(bool) => setState(current => ({ ...current, credits: bool }))} />}
              {state.statsModal && <StatsModal open={state.statsModal} onClose={() => setState(current => ({ ...current, statsModal: false }))} />}
            </>
          }></Route>

          <Route path="/embedd" element={
            <>
              {state.loading && <LoadingApp />}
              {!state.loading && <>
                <Map />
                <Legend />
                <LayerDetails />
                <Timeline />

                <Stack className="backdrop-blur" component={Paper} elevation={5} sx={{ borderRadius: 0, padding: '10px', background: palette.palette.primary.main, position: 'fixed', top: '0px', left: '50%', transform: 'translateX(-50%)', width: '100%', zIndex: 99999 }}>
                  <a style={{ margin: '0 auto' }} href={"https://ecodatacube.eu/" + window.location.search} target="_blank">
                    <img src="/ecodatacube_logo_europe.svg" width="250" />
                  </a>
                </Stack>
              </>}
            </>
          } />


        </Routes>
      </ThemeProvider>

    </AppContextProvider>
  )
}

export default App
