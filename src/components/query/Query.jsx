import { Box, Button, ButtonGroup, CircularProgress, Fab, IconButton, LinearProgress, Paper, Stack, Switch, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import $data from "../../services/$data";
import { AppContext } from "../../AppContext";
import { useTheme } from "@emotion/react";
import { Bar, Line } from "react-chartjs-2";
import { CategoryScale, LinearScale, BarElement, PointElement, LineElement, Tooltip, Legend, Filler } from 'chart.js';
import { Chart } from "chart.js";
import { KeyboardDoubleArrowDown, KeyboardDoubleArrowUp } from "@mui/icons-material";
import $stream from "../../services/$stream";
import { toLonLat } from "ol/proj";
import RedSwitch from "../ui/RedSwitch";
Chart.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Tooltip, Legend, Filler);

const depthMap = {
  '0cm': 'b0cm..20cm',
  '20cm': 'b20cm..50cm',
  '50cm': 'b50cm..100cm',
  '100cm': 'b100cm..200cm',
}

let streamController = new AbortController();

function Query(props) {
  const theme = useTheme();
  const { layer, layers, setState, depth } = useContext(AppContext);
  const layerObj = layers.find(l => l.title === layer);

  const [bar, setBar] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [legend, setLegend] = useState([]);
  const [withUncertainty, setWithUncertainty] = useState(false);

  const onSetData = (data) => {
    // let sorted = data.sort((a,b) => {
    //   return 
    // });
    try {
      console.log(data)
      setData(data.map((obj) => ({ ...obj, value: layerObj.transformFunction(obj.value), p16: layerObj.transformFunction(obj.p16), p84: layerObj.transformFunction(obj.p84) })));
    } catch (error) {
      console.log(error)
      setData(data)
    }
  }
  console.log(depth)
  const query = async () => {
    streamController.abort('cancel');
    streamController = new AbortController();
    setData([]);

    try {
      setLoading(true);
      const coords = toLonLat(props.coordinates);
      console.log(depth)
      let url = withUncertainty ? 
      layerObj.queryUrl.replace('__LAT__', coords[1]).replace('__LON__', coords[0]) +
          '&title=' + layerObj.title + '&prob=true' :
          layerObj.queryUrl.replace('__LAT__', coords[1]).replace('__LON__', coords[0]) +
          '&title=' + layerObj.title;

      url = layerObj.depths.length > 0 && withUncertainty ? url.replace('*', depthMap[depth]) : url;
      // const data = await $data.pointQuery(layerObj.queryUrl, props.coordinates);
      console.log(url)
      $stream.getStream({
        url: url,
        settings: {
          signal: streamController.signal,
        },
        onError: (e) => {
          console.log(e);
        },
        onSetData: (data) => {
          onSetData(data);
        },
        onFormatValue: (val) => {
          let formated = '';

          if (val[0] === ',' || val[val.length - 1] === ',') {
            if (val[0] === ',') {
              formated = val.slice(1, val.length);
            }

            if (formated[formated.length - 1] === ',') {
              formated = formated.slice(0, formated.length - 1);
            }
          } else {
            formated = val;
          }



          return JSON.parse(`[${formated}]`);
        },
        onEnd: (data) => {

          setLoading(false)
          onSetData(data);
        }
      })
    } catch (error) {
      console.log(error)
      setError(true);
    } finally {
    }

  }

  useEffect(() => {
    if (withUncertainty) {
      setBar(false);
    }
    if(props.coordinates) {
      query()
    }
  }, [withUncertainty])

  useEffect(() => {
    if (props.coordinates) {
      query();
    } else {
      $stream.cancel();
      setData([]);
    }
  }, [JSON.stringify(props.coordinates)]);

  useEffect(() => {
    if (props.coordinates) {
      query();
    }
  }, [layer])

  useEffect(() => {
    if (props.coordinates && withUncertainty) {
      query();
    }
  }, [depth])

  const renderContent = () => {
    if (!props.coordinates) {
      return <CircularProgress color="secondary" />;
    }

    // if (loading) {
    //   return <CircularProgress color="secondary" />
    // }

    if (error) {
      return <Typography variant="h6" color="error">Something went wrong!</Typography>
    }

    if (withUncertainty) {
      return (
        <>
          {loading && <CircularProgress variant="indeterminate" sx={{ position: 'absolute', bottom: '150px', width: '100%' }} color="secondary" />}
          <Line data={$data.formatData(data, legend, layerObj, bar, true)} options={$data.formatOptions(layerObj, true)} />;
        </>
      )
    }

    if (bar) {
      return (
        <>
          {loading && <CircularProgress variant="indeterminate" sx={{ position: 'absolute', bottom: '150px', width: '100%' }} color="secondary" />}
          <Bar data={$data.formatData(data, legend, layerObj, bar)} options={$data.formatOptions(layerObj)} />
        </>
      );
    }

    return (
      <>
        {loading && <CircularProgress variant="indeterminate" sx={{ position: 'absolute', bottom: '150px', width: '100%' }} color="secondary" />}
        <Line data={$data.formatData(data, legend, layerObj, bar)} options={$data.formatOptions(layerObj)} />;
      </>
    )


  }

  return (
    <Stack className={"backdrop-blur-strong query-window" + (Boolean(props.coordinates) ? ' opened' : '')} sx={{ padding: '25px 15px 15px 15px', borderRadius: 0, background: theme.palette.primary.main, position: 'absolute', bottom: '-320px', width: '100%', height: '320px', zIndex: 10000 }} component={Paper} elevation={5} direction="row" justifyContent={"center"} alignItems={"center"}>
      {Boolean(props.coordinates) && <Fab onClick={() => props.setCoordinates(null)} size="small" sx={{ position: 'absolute', bottom: '327px', left: '50%', transform: 'translateX(-50%)' }} color="primary"><KeyboardDoubleArrowDown /></Fab>}
      <Box sx={{ position: 'absolute', bottom: '280px', left: '7px', zIndex: 10000000 }}>
        <Stack direction="row" alignItems="center" spacing={2}>

          <Stack direction="row" alignItems="center" spacing={2}>
            <RedSwitch checked={withUncertainty} onChange={(e) => setWithUncertainty(e.target.checked)} color="secondary" sx={{}} />
            <Typography variant="body2" color="secondary">{withUncertainty ? 'With uncertainty' : 'Without uncertainty'}</Typography>
          </Stack>
          {!withUncertainty && <ButtonGroup orientation="horizontal">
            <Button onClick={() => setBar(true)} variant={bar ? "contained" : 'outlined'} color={bar ? 'selected' : 'secondary'} size="small">Bar</Button>
            <Button onClick={() => setBar(false)} variant={!bar ? "contained" : 'outlined'} color={!bar ? 'selected' : 'secondary'} size="small">Line</Button>
          </ButtonGroup>}

          {withUncertainty && layerObj.depths.length > 0 && (
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Box onClick={() => setState(current => ({ ...current, depth: '0cm' }))} sx={{ '&:hover': { background: theme.palette.selected.main }, background: depth === '0cm' ? theme.palette.selected.main : 'transparent', transition: '.1s background linear', fontSize: '12px', padding: '3px 4px', width: '80px', textAlign: 'center', cursor: 'pointer', color: "#fff" }}>0–20 cm</Box>
              <Box onClick={() => setState(current => ({ ...current, depth: '20cm' }))} sx={{ '&:hover': { background: theme.palette.selected.main }, background: depth === '20cm' ? theme.palette.selected.main : 'transparent', transition: '.1s background linear', fontSize: '12px', padding: '3px 4px', width: '80px', textAlign: 'center', cursor: 'pointer', color: "#fff" }}>20–50 cm</Box>
              <Box onClick={() => setState(current => ({ ...current, depth: '50cm' }))} sx={{ '&:hover': { background: theme.palette.selected.main }, background: depth === '50cm' ? theme.palette.selected.main : 'transparent', transition: '.1s background linear', fontSize: '12px', padding: '3px 4px', width: '80px', textAlign: 'center', cursor: 'pointer', color: "#fff" }}>50–100 cm</Box>
              <Box onClick={() => setState(current => ({ ...current, depth: '100cm' }))} sx={{ '&:hover': { background: theme.palette.selected.main }, background: depth === '100cm' ? theme.palette.selected.main : 'transparent', transition: '.1s background linear', fontSize: '12px', padding: '3px 4px', width: '80px', textAlign: 'center', cursor: 'pointer', color: "#fff" }}>100–200 cm</Box>
            </Stack>
          )}
        </Stack>
      </Box>

      {renderContent()}
    </Stack>
  )
}

export default Query;