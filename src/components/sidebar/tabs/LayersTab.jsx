import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Link,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Radio,
  RadioGroup,
  Slider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../../AppContext";
import $data from "../../../services/$data";
import WmsLayer from "../../../models/WmsLayer";
import { ExpandMore } from "@mui/icons-material";

function LayersTab(props) {
  const themes = useRef({ ...WmsLayer.themesEmpty });
  const { opacity, layer, vector, setState, layers } = useContext(AppContext);
  const [expanded, setExpanded] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setExpanded(checkExanded(layer));
  }, [layer]);

  const checkExanded = (layer) => {
    for (let i = 0; i < Object.keys(themes.current).length; i++) {
      let obj = themes.current[Object.keys(themes.current)[i]].filter(
        (l) => l.title === layer
      );
      if (obj.length > 0) {
        return i;
      }
    }
  };

  const renderThemes = (list) => {
    let filtered = [...list];
    if (query !== "") {
      filtered = list.filter(
        (l) =>
          l.title.toLowerCase().trim().indexOf(query.toLowerCase().trim()) > -1
      );
    }

    themes.current = { ...WmsLayer.themesEmpty };

    filtered.map((layer, index) => {
      themes.current[WmsLayer.themeMap[layer.class]] = [
        ...themes.current[WmsLayer.themeMap[layer.class]],
        layer,
      ];
    });

    return Object.keys(themes.current)
      .filter((theme) => themes.current[theme].length > 0)
      .map((theme, index) => {
        return (
          <Accordion
            onChange={(evt, checked) => setExpanded(checked ? index : null)}
            expanded={index === expanded}
            disableGutters
            slotProps={{ transition: { unmountOnExit: true } }}
            sx={{
              background: "transparent",
              border: "none",
              "&::before": { display: "none" },
            }}
            key={index}
            elevation={0}
          >
            <AccordionSummary
              sx={{
                padding: "0px 10px",
                color: "#ffffff",
                "& path": { fill: "#ffffff" },
                "& span": { margin: "0px auto" },
                "&.MuiAccordionSummary-root": { minHeight: "0px !important" },
                fontWeight: "bold",
                fontSize: "16px",
              }}
              expandIcon={<ExpandMore />}
              title={theme}
            >
              {theme}
            </AccordionSummary>
            <AccordionDetails
              sx={{
                background: "transparent",
                border: "none",
                maxHeight: "200px",
                overflowY: "auto",
              }}
            >
              <List sx={{ padding: 0 }} dense>
                {renderLayers([...themes.current[theme]])}
              </List>
            </AccordionDetails>
          </Accordion>
        );
      });
  };

  const renderLayers = (list) => {
    return list.map((item, index) => {
      return (
        <ListItemButton
          selected={item.title === layer}
          key={index}
          onClick={() => {
            setState((current) => ({
              ...current,
              layer: item.title,
              time: item.range[item.range.length - 1],
            }));
          }}
          dense
        >
          <ListItemText
            sx={{
              color: "#ffffff99",
              "& p": { color: "#ffffff99", fontSize: "11px" },
              "& span": { fontWeight: "bold", fontSize: "13px", color: "#fff" },
            }}
            primary={item.title}
            secondary={
              item.description.split(" ").length > 25
                ? item.description
                  .split(" ")
                  .filter((w, i) => i <= 25)
                  .join(" ") + "..."
                : item.description
            }
          ></ListItemText>
        </ListItemButton>
      );
    });
  };

  const renderContent = () => {
    return renderThemes(layers);
  };

  return (
    <Stack spacing={2} sx={{ overflowX: "hidden" }}>
      <TextField
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        variant="outlined"
        color="secondary"
        placeholder="Search Layers"
        size="small"
        sx={{
          "& fieldset": { borderColor: "#fff !important" },
          "& input": { color: "#fff !important" },
        }}
      ></TextField>
      <Stack>
        <Typography sx={{ marginLeft: "10px" }} color="secondary">
          <strong>Opacity ({opacity}%)</strong>
        </Typography>
        <Slider
          sx={{ width: "calc(100% - 20px)", margin: "0 auto" }}
          color="secondary"
          min={0}
          max={100}
          value={opacity}
          onChange={(e, value) => {
            setState((current) => ({ ...current, opacity: value }));
          }}
        />
      </Stack>
      {renderContent()}

      <Stack sx={{ padding: '5px', marginTop: '20px', paddingLeft: '10px' }}>
        <Divider sx={{ background: '#fff', marginBottom: '20px' }} />
        <Typography sx={{width: '95%'}} color="secondary">
          <strong >Regions, Field Boundaries & Training Data</strong>
        </Typography>
        <FormControl color="secondary">
          <RadioGroup aria-label="overlay" name="overlays" value={"nuts"}>
            <FormControlLabel
              color="secondary"
              sx={{ '& span': { color: '#fff' }, '& .MuiTypography-root': { fontSize: '14px !important' } }}
              value="nuts"
              checked={vector === 'nuts'}
              control={<Radio color="secondary" />}
              onChange={(e, checked) => {
                setState((current) => ({
                  ...current,
                  vector: e.target.value,
                }));
              }}
              label={<Stack direction="row" alignItems="center" spacing={2}>
                <Typography color="secondary">
                  NUTS Regions Level-3
                </Typography>
                <Link target="_blank" href="https://ec.europa.eu/eurostat/web/gisco/geodata/statistical-units/territorial-units-statistics" color="selected">(Source)</Link>
              </Stack>}
            />

            <FormControlLabel
              color="secondary"
              sx={{ '& span': { color: '#fff' }, '& .MuiTypography-root': { fontSize: '14px !important' } }}
              value="field"
              checked={vector === 'field'}
              onChange={(e, checked) => {
                setState((current) => ({
                  ...current,
                  vector: e.target.value,
                }));
              }}
              control={<Radio color="secondary" />}
              label={<Stack direction="row" alignItems="center" spacing={2}>
                <Typography color="secondary">
                  Field Boundaries
                </Typography>
                <Link target="_blank" href="https://doi.org/10.5281/zenodo.14229032" color="selected">(Source)</Link>
              </Stack>}
            />

            <FormControlLabel
              color="secondary"
              sx={{ '& span': { color: '#fff' }, '& .MuiTypography-root': { fontSize: '14px !important' } }}
              value="lcv"
              checked={vector === 'lcv'}
              onChange={(e, checked) => {
                setState((current) => ({
                  ...current,
                  vector: e.target.value,
                }));
              }}
              control={<Radio color="secondary" />}
              label={<Stack direction="row" alignItems="center" spacing={2}>
                <Typography color="secondary">
                  Land Cover Samples
                </Typography>
                <Link target="_blank" href="https://doi.org/10.7717/peerj.13573" color="selected">(Source)</Link>
              </Stack>}
            />

            <FormControlLabel
              color="secondary"
              sx={{ '& span': { color: '#fff' }, '& .MuiTypography-root': { fontSize: '14px !important' } }}
              value="tree"
              checked={vector === 'tree'}
              onChange={(e, checked) => {
                setState((current) => ({
                  ...current,
                  vector: e.target.value,
                }));
              }}
              control={<Radio color="secondary" />}
              label={<Stack direction="row" alignItems="center" spacing={2}>
                <Typography color="secondary">
                  Tree Species Samples
                </Typography>
                <Link target="_blank" href="https://doi.org/10.7717/peerj.13728" color="selected">(Source)</Link>
              </Stack>}
            />
            <FormControlLabel
              color="secondary"
              value="off"
              checked={vector === 'off'}
              sx={{ '& span': { color: '#fff' }, '& .MuiTypography-root': { fontSize: '14px !important' } }}
              onChange={(e, checked) => {
                setState((current) => ({
                  ...current,
                  vector: e.target.value,
                }));
              }}
              control={<Radio color="secondary" />}
              label="Off"
            />
          </RadioGroup>
        </FormControl>
      </Stack>
    </Stack>
  );
}

export default LayersTab;
