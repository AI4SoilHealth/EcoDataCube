import { Link, Stack, Typography } from "@mui/material";

function AboutTab(props) {
  return (
    <Stack sx={{padding: '20px'}} spacing={4}>
      <img style={{margin: '0 auto'}} src="/ecodatacube_logo_europe.svg" height="60" />
      <Typography variant="h6" color="selected" textAlign="center">Version 2.0.0</Typography>

      <Stack spacing={1}>
        <img src="/oem.webp" width="120" />
        <Typography color="secondary" fontSize={'12px'}>
          The Open-Earth-Monitor Cyberinfratructure project has received funding from the European Union's Horizon Europe research and innovation programme under grant agreement <Link href="https://cordis.europa.eu/project/id/101059548" target="_blank" color="selected">No. 101059548</Link>.
        </Typography>
      </Stack>
      <Stack spacing={1}>
        <img src="/ai4.png" width="120" />
        <Typography color="secondary" fontSize={'12px'}>
        The AI4SoilHealth project has received funding from the European Union's Horizon Europe research and innovation programme under grant agreement <Link href="https://cordis.europa.eu/project/id/101086179" target="_blank" color="selected">No. 101086179</Link>.
        </Typography>
      </Stack>

      <Stack spacing={1}>
        <Typography color="secondary" fontSize={'12px'}>

        <Link fontWeight="bold" href="https://ecodatacube.eu/" color="selected">EcoDataCube hosted at ecodatacube.eu</Link> comprises environmental, land cover, terrain, climatic, soil and vegetation layers covering the continental Europe at relatively fine spatial resolutions (30-m to 1-km). It has been produced within the CEF Telecom project <Link color="selected" fontWeight="bold" href="https://ec.europa.eu/inea/en/connecting-europe-facility/cef-telecom/2018-eu-ia-0095" >2018-EU-IA-0095</Link>: “Geo-harmonizer: EU-wide automated mapping system for harmonization of Open Data based on FOSS4G and Machine”. Use it to visualize and serve spatiotemporal datasets for the periods 2000–2020 and beyond and share it with your colleagues. Predictions are typically based on using Ensemble Machine Learning applied to large spatiotemporal training datasets, often derived through other European Commission funded projects such as the <Link href="https://ec.europa.eu/eurostat/web/lucas" color="selected" fontWeight="bold">LUCAS</Link> (Land Use and Coverage Area frame Survey), and the <Link color="selected" fontWeight="bold" href="https://land.copernicus.eu/">Copernicus Land Monitoring Service</Link>. The Earth Observation data used to generate predictions is primarily based on the <Link color="selected" href="https://www.glad.umd.edu/ard/home" fontWeight={"bold"}>GLAD Landsat ARD imagery</Link> and <Link href="https://sentinel.esa.int/web/sentinel/sentinel-data-access" color="selected" fontWeight="bold">ESA Sentinel</Link> products. To report an issue or a bug please use gitlab. Have a new similar data set that you would like to publish on the ecodatacube.eu data portal? Please <Link color="selected" fontWeight="bold" href="https://opendatascience.eu/contact-us/" >contact us</Link>.        </Typography>
      </Stack>

      <Stack spacing={1} justifyContent="center" alignItems="center">
      <a class="clustrmaps" target="_blank" href="https://clustrmaps.com/site/1c5a6" title="Visit tracker"><img src="//clustrmaps.com/map_v2.png?cl=080808&amp;w=360&amp;t=n&amp;d=nYAAEACPORTUZ0jyzFuPujUsfFCV52FWPoiyzUoaegc&amp;co=ffffff&amp;ct=808080"/></a>
      </Stack>
    
    </Stack>
  )
}

export default AboutTab;