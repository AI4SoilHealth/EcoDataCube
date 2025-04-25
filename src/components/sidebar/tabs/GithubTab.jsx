import { Autorenew, Book, Code, GitHub, MenuBook, Recycling, Refresh } from "@mui/icons-material";
import { Box, Button, CircularProgress, Stack, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import $data from "../../../services/$data";
import { render } from "sass";

function GithubTab(props) {
  const theme = useTheme();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [issues, setIssues] = useState([]);

  const getIssues = async () => {
    try {
      let data = await $data.getGithubIsses();
      setIssues(data);

    } catch (error) {
      console.log(error)
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getIssues();
  }, [])


  const renderIssues = () => {
    if (loading) {
      return (
        <Stack sx={{ height: '100%' }} justifyContent="center" alignItems="center">
          <CircularProgress color="secondary" />
        </Stack>
      )
    }

    if (error) {
      return (
        <Stack sx={{ height: '100%' }} justifyContent="center" alignItems="center">
          <Typography textAlign="center" color="selected"> Couldn't load issues! <br /> Please try again later</Typography>
        </Stack>
      )
    }

    if (issues.length === 0) {
      return (
        <Stack sx={{ height: '100%' }} justifyContent="center" alignItems="center">
          <Typography color="secondary">Nothing posted yet!</Typography>
        </Stack>
      )
    }

    return issues.map((issue, i) => {
      return (
        <Stack key={i} sx={{ marginTop: '15px', marginBottom: '22px' }} spacing={1}>
          <Typography href={issue.link} target="_blank" color="selected" component={'a'} sx={{textDecoration: 'none', fontWeight: 'bold'}}>{issue.title}</Typography>
          <Typography variant="caption" sx={{color: theme.palette.secondary.main + 'ff', overflow: 'hidden', textOverflow: 'ellipsis'}}>{issue.description.slice(0, 200)} ...</Typography>
          <Typography variant="caption" sx={{color: theme.palette.secondary.main + '99'}}>{issue.timeAndUser}</Typography>
        </Stack>
      );
    });
  }


  return (
    <Stack sx={{height: '100%'}} spacing={3}>
      <Typography textAlign="center" variant="h6" color="secondary">Support</Typography>

      <Stack direction="row" justifyContent="space-around" alignItems="center" spacing={2}>
        <Button component={'a'} href="https://shdc.ai4soilhealth.eu/" target="_blank" startIcon={<MenuBook />} variant="contained" color="selected" size="small">Docs</Button>
        <Button component={'a'} href="https://github.com/AI4SoilHealth/EcoDataCube" target="_blank" startIcon={<GitHub />} variant="contained" color="selected" size="small">Repository</Button>
      </Stack>
      {renderIssues()}
    </Stack>
  )
}

export default GithubTab;