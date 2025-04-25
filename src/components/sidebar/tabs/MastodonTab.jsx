import { Autorenew, Recycling, Refresh } from "@mui/icons-material";
import { Box, CircularProgress, Stack, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import $data from "../../../services/$data";

function MastodonTab(props) {
  const theme = useTheme();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    try {
      let data = await $data.getMastodonPosts();
      setPosts(data);

    } catch (error) {
      console.log(error)
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getPosts();
  }, [])

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
        <Typography textAlign="center" color="selected"> Couldn't load posts! <br /> Please try again later</Typography>
      </Stack>
    )
  }

  if (posts.length === 0) {
    return (
      <Stack sx={{ height: '100%' }} justifyContent="center" alignItems="center">
        <Typography color="secondary">Nothing posted yet!</Typography>
      </Stack>
    )
  }

  return posts.map((post, i) => {
    return (
      <Stack key={i} sx={{ marginTop: '15px', marginBottom: '15px' }} spacing={1}>
        {post.isBoosted && <Typography color="secondary" sx={{ color: '#ffffffcc', marginBottom: '5px' }} variant="caption" component={Stack} direction="row" alignItems="center" spacing={2}><Autorenew fontSize="small" color="secondary" /> Boosted</Typography>}
        
        <Stack component={'a'} sx={{ textDecoration: 'none' }} href={post.postUrl} target="_blank" direction="row" spacing={2} justifyContent="space-between" alignItems="flex-end">
          <Stack direction="row" justifyContent="flex-start" spacing={2}>
            <img src={post.avatar} alt="" width="40px" height="40px" style={{ borderRadius: '50%' }} />
            <Stack>
              <Typography sx={{ textDecoration: 'none', fontWeight: 'bold' }} color="selected" variant="caption">{post.username}</Typography>
              <Typography sx={{ textDecoration: 'none', fontWeight: 'bold' }} color="selected" variant="caption">{post.displayName}</Typography>
            </Stack>

          </Stack>
          <Typography color="secondary" variant="caption">{post.date}</Typography>

        </Stack>
        <Box sx={{fontSize: '13px', '& p': {
          color: theme.palette.secondary.main + '99',
        }, '& a': {
          color: theme.palette.selected.main,
          textDecoration: 'none',
          wordBreak: 'break-all'
        }
        }} dangerouslySetInnerHTML={{__html: post.content}}></Box>
        <img style={{width: '100%'}} src={post.media} />
      </Stack>
    );
  })
}

export default MastodonTab;