import { Box, Button, ButtonGroup, CircularProgress, Fab, IconButton, LinearProgress, Paper, Stack, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import $data from "../../services/$data";
import { AppContext } from "../../AppContext";
import { useTheme } from "@emotion/react";
import { Bar, Line } from "react-chartjs-2";
import { CategoryScale, LinearScale, BarElement, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import { Chart } from "chart.js";
import { KeyboardDoubleArrowDown, KeyboardDoubleArrowUp } from "@mui/icons-material";
import $stream from "../../services/$stream";
import { toLonLat } from "ol/proj";
Chart.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Tooltip, Legend);

let streamController = new AbortController();

function Query(props) {
  const theme = useTheme();
  const { layer, layers } = useContext(AppContext);
  const layerObj = layers.find(l => l.title === layer);

  const [bar, setBar] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [legend, setLegend] = useState([]);

  const onSetData = (data) => {
    // let sorted = data.sort((a,b) => {
    //   return 
    // });
    try {
      setData(data.map((obj) => ({...obj, value: layerObj.transformFunction(obj.value)})))
    } catch (error) {
      console.log(error)
      setData(data)
    }
  }

  const query = async () => {
    streamController.abort('cancel');
    streamController = new AbortController();
    setData([]);

    try {
      setLoading(true);
      const coords = toLonLat(props.coordinates);

      // const data = await $data.pointQuery(layerObj.queryUrl, props.coordinates);
      $stream.getStream({
        url: layerObj.queryUrl.replace('__LAT__', coords[1]).replace('__LON__', coords[0]),
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

    if (bar) {


      return (
        <>
        {loading && <CircularProgress variant="indeterminate" sx={{position: 'absolute',bottom: '150px', width: '100%'}} color="secondary" />}
        <Bar data={$data.formatData(data, legend, layerObj, bar)} options={$data.formatOptions(layerObj)} />
        </>
      );
    }

    return (
      <>
        {loading && <CircularProgress variant="indeterminate" sx={{position: 'absolute',bottom: '150px', width: '100%'}} color="secondary" />}
        <Line data={$data.formatData(data, legend, layerObj, bar)} options={$data.formatOptions(layerObj)} />;
      </>
    )


  }

  return (
    <Stack className={"backdrop-blur-strong query-window" + (Boolean(props.coordinates) ? ' opened' : '')} sx={{ padding: '15px', borderRadius: 0, background: theme.palette.primary.main, position: 'absolute', bottom: '-320px', width: '100%', height: '320px', zIndex: 10000 }} component={Paper} elevation={5} direction="row" justifyContent={"center"} alignItems={"center"}>
      {Boolean(props.coordinates) && <Fab onClick={() => props.setCoordinates(null)} size="small" sx={{ position: 'absolute', bottom: '327px', left: '50%', transform: 'translateX(-50%)' }} color="primary"><KeyboardDoubleArrowDown /></Fab>}
      <Box sx={{ position: 'absolute', bottom: '280px', left: '7px', zIndex: 10000000 }}>
        <ButtonGroup orientation="horizontal">
          <Button onClick={() => setBar(true)} variant={bar ? "contained" : 'outlined'} color={bar ? 'selected' : 'secondary'} size="small">Bar</Button>
          <Button onClick={() => setBar(false)} variant={!bar ? "contained" : 'outlined'} color={!bar ? 'selected' : 'secondary'} size="small">Line</Button>
        </ButtonGroup>
      </Box>

      {renderContent()}
    </Stack>
  )
}

export default Query;