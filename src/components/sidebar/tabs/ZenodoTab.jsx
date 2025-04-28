import { CircularProgress, Link, List, ListItemButton, ListItemText, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import $data from "../../../services/$data";

function ZenodoTab() {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const data = await $data.getZenodoPublications();
      setData(data);
    } catch (error) {
      console.log(error)
      setError('Somethin went wrong!')
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, [])

  const renderPublications = () => {
    if(loading) {
      return <CircularProgress sx={{textAlign: 'center'}} color="secondary" />
    }
  
    if(error) {
      return <Typography textAlign="center" color="selected"> Couldn't load publications! <br /> Please try again later</Typography>
    }
  
    return data.map(obj => {
      return (
        <ListItemButton LinkComponent={Link} href={obj.zenodoLink} target="_blank">
          <ListItemText color="secondary" sx={{'& span': {color: '#fff'}, '&>span': {fontWeight: 'bold !important'}}} primary={obj.title} secondary={
            <Stack sx={{mt: '5px'}}>
              <Stack sx={{mb: '5px'}} direction="row" justifyContent="space-between" alignItems="center"><span style={{fontSize: '11px'}}>{obj.date}</span>  <strong style={{fontSize: '11px', color: '#fff'}}>DOI: {obj.doi}</strong></Stack>
              <span style={{fontStyle: 'italic', fontSize: '11px', color: '#ffffff99'}}>{obj.creators}</span>
            </Stack>
          }></ListItemText>
        </ListItemButton>
      );
    });
    
  }

  return (
    <Stack sx={{height: '100%', width: '100%'}} spacing={3}>
      <Typography textAlign="center" variant="h6" color="secondary" >Zenodo Records</Typography>

      <List sx={{textAlign: 'center'}} dense>
        {renderPublications()}
      </List>
    </Stack>
  );
}

export default ZenodoTab;