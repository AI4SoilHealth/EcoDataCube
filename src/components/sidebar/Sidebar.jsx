import { Stack, useTheme } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../../AppContext";
import BasemapsTab from "./tabs/BasemapsTab";
import ShareTab from "./tabs/ShareTab";
import MastodonTab from "./tabs/MastodonTab";
import GithubTab from "./tabs/GithubTab";
import LayersTab from "./tabs/LayersTab";
import Help from "./tabs/Help";

function Sidebar() {
  const theme = useTheme();
  const {sidebar,tab} = useContext(AppContext);

  const renderTab = () => {
    switch (tab) {
      case 'basemaps':
        return <BasemapsTab />
      case 'layers':
        return <LayersTab />
      case 'github':
        return <GithubTab />
      case 'mastodon':
        return <MastodonTab />
      case 'share':
        return <ShareTab />
      case 'bookmark':
        return <div>Bookmark</div>
      case 'help':
        return <Help />
      default:
        return null;
    }
  }

  return (
    <Stack className={`backdrop-blur sidebar-container${sidebar ? ' sidebar-opened' : ''}`} sx={{background: theme.palette.primary.main, position: 'fixed', right: 0, top: 0, height: 'calc(100% - 45px)', width: '320px', padding: '10px'}}>
      {renderTab() }
    </Stack>
  )
}

export default Sidebar;