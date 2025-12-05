import { alpha, styled, Switch } from "@mui/material";

const RedSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: theme.palette.selected.main,
    '&:hover': {
      backgroundColor: alpha(theme.palette.selected.main, theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: theme.palette.selected.main,
  },
}));

export default RedSwitch;