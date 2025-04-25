import { Autocomplete, InputAdornment, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Stack, TextField, useTheme } from "@mui/material";
import { LocationOn, Search } from "@mui/icons-material";
import { useCallback, useContext, useRef, useState } from "react";
import axios from "axios";
import { fromLonLat } from "ol/proj";
import $map from '../../services/$map';
import { AppContext } from "../../AppContext";
function SearchLocation(props) {
  const {setState} = useContext(AppContext);
  const timeout = useRef();

  const theme = useTheme();

  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('');

  const onSearch = (e) => {
    setQuery(e.target.value);
    clearTimeout(timeout.current);
    if (e.target.value.length >= 1) {
      fetchResults(e.target.value);
    } else {

      setResults([]);
    }
  }

  const fetchResults = useCallback((query) => {
    timeout.current = setTimeout(() => {
      axios.get(`https://nominatim.openstreetmap.org/search?format=json&limit=4&accept-language=en&q=${query}`)
        .then((result) => setResults(result.data))
        .catch(err => {
          console.log(err);
        })
    }, 500)
  });

  const onSelect = (result) => {
    setQuery(result.display_name);
    setResults([]);
    $map.instance.getView().animate({center: fromLonLat([parseFloat(result.lon), parseFloat(result.lat)]), duration: 350}, {zoom: 12, duration: 350});
  }

  return (
    <Stack className="backdrop-blur" component={Paper} elevation={5} sx={{ width: '100%', maxWidth: {xs: 'calc(100% - 54px)', md: '360px'}, background: theme.palette.primary.main, position: 'absolute', top: '7px', left: '7px', padding: '0 7px', borderRadius: 0 }} direction="row" alignItems="center" spacing={1}>
      <a style={{cursor: 'pointer', height: '25px', lineHeight: 'unset'}} onClick={() => setState(current => ({...current, about: true}))}><img src="/ecodatacube_logo_europe.svg" width="120" /></a>

      <TextField fullWidth value={query} onChange={onSearch} color="secondary" placeholder="Search Location" size="small" sx={{ '& fieldset': { display: 'none' }, '& .MuiInputBase-root': {padding: 0}, '& input': { color: '#fff !important', paddingLeft: 0 } }} className="search-prompt" slotProps={{ input: {endAdornment: <InputAdornment position="end"><Search color="secondary" /></InputAdornment> } }}></TextField>
      <div style={{ positon: 'relative' }}>
        {results.length >= 1 && <Paper sx={{ borderRadius: 0, position: 'absolute', top: '47px', width: 'calc(100% - 50px)', left: '50px', background: theme.palette.primary.main, zIndex: 1 }} elevation={5}>

          <List sx={{ width: '100%' }}>
            {results.map((result, index) => {
              return (
                <ListItemButton key={index} onClick={() => {onSelect(result) }} dense>
                  <ListItemText sx={{ color: '#ffffff99', '& p': {color: '#ffffff99'}, '& span': { fontWeight: 'bold', fontSize: '16px', color: "#fff" } }} primary={result.display_name} secondary={`${parseFloat(result.lat).toFixed(5)}, ${parseFloat(result.lon).toFixed(5)}`} />
                </ListItemButton>
              )
            })}


          </List>

        </Paper>}
      </div>
    </Stack>
  )
}

export default SearchLocation;