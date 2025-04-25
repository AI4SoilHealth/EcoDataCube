import { Paper, Stack, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

function FeatureDetails({type, properties, show}) {
  if(!show) return null;
  console.log(properties);

  const renderProperties = () => {
    if(type === 'nuts') {
      return (
        <Table sx={{'td' : {padding: '2px', color: '#fff'}, 'th': {padding: '2px', color: "#fff"}}}>
          <TableHead>
            <TableRow>
              <TableCell colSpan={2}>Feature Properties</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(properties).filter(key => key !== 'geometry').map((key, index) => {
              return <TableRow key={index}>
                <TableCell>{key}</TableCell>
                <TableCell>{JSON.stringify(properties[key])}</TableCell>
              </TableRow>
            })}
          </TableBody>
        </Table>
      )
    }
  
    if(type === 'field') {
      return (
        <Table sx={{'td' : {padding: '2px', color: '#fff'}, 'th': {padding: '2px', color: "#fff"}}}>
          <TableHead>
            <TableRow>
              <TableCell colSpan={2}>Feature Properties</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(properties).filter(key => key !== 'geometry' && key !== 'bbox').map((key, index) => {
              return <TableRow key={index}>
                <TableCell>{key}</TableCell>
                <TableCell>{JSON.stringify(properties[key])}</TableCell>
              </TableRow>
            })}
          </TableBody>
        </Table>
      )
    }
    
    return null;
  }

  return (
    <Stack component={Paper} elevation={5} sx={{padding: '10px', background: '#000000cc', position: 'absolute', top: '60px', left: '54px'}}>
      {renderProperties()}
    </Stack>
  )
}

export default FeatureDetails;