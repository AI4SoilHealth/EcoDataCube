import { useContext, useState } from "react";
import { AppContext } from "../../AppContext";
import { Autocomplete, InputAdornment, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";

function TimelineLayerSelector({isSecond}) {
  const { layer, layer2, layers, layers2, setState } = useContext(AppContext);
 

  const setValue = (val) => {
    if(isSecond) {
      setState(current => ({ ...current, layer2: val.value }));
    } else {
      setState(current => ({ ...current, layer: val.value }));
    }
  }

  return (
    <Autocomplete
      sx={{'& path': { fill: '#fff !important' }}}
      disablePortal
      disableClearable
      
      slotProps={{paper: {elevation: '5', className: 'backdrop-blur-strong', sx: {borderRadius: 0, background: '#000000cc', padding: '5px',color: "#fff"}}}}
      options={isSecond ? layers2.map(l => ({label: l.title.split('-2')[0], value: l.title})) : layers.map(l => ({label: l.title, value: l.title}))}
      value={{label: isSecond ? layer2 : layer, value: isSecond ? layer2 : layer}}
      getOptionLabel={(option) => option.label.split('-2')[0]}
      onChange={(e, val) => {
        setValue(val)
      }}
      renderInput={(params) => <TextField {...params} value={isSecond ? layer2 : layer} color="secondary" placeholder="Select layer" size="small" sx={{ '& fieldset': { display: 'none' }, '& .MuiInputBase-root': {padding: 0}, '& input': { color: '#fff !important', paddingLeft: 0, fontSize: '12px' } }}></TextField>}
      />
  )
}

export default TimelineLayerSelector;