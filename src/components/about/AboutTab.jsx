import { Link, Stack, Typography } from "@mui/material";

function AboutTab(props) {
  return (
    <Stack sx={{ padding: '20px' }} spacing={4}>
      <img style={{ margin: '0 auto' }} src="/ecodatacube_logo_europe.svg" height="60" />
      <Typography variant="h6" color="selected" textAlign="center">Version 2.0.0</Typography>
      <Stack spacing={1}>
        <Typography color="secondary" fontSize={'12px'}>
          EcoDataCube portal hosts environmental layers representing dynamics of land cover, land use, climate, relief, potential and actual vegetation, forest cover and dynamics, soil variables from the Soil Health Data Cube and various long-term estimates of trends quantifying land degradation and land restoration processes. EcoDataCube is described in detail in:
          <ul>
            <li>
              Witjes, M., Parente, L., Križan, J., Hengl, T., & Antonić, L. (2023). Ecodatacube. eu: analysis-ready open environmental data cube for Europe. PeerJ, 11, e15478.  <Link href="https://doi.org/10.7717/peerj.15478" target="_blank" color="selected">https://doi.org/10.7717/peerj.15478</Link>.
            </li>
            <li>
              Tian, X., Consoli, D., Witjes, M., Schneider, F., Parente, L., Şahin, M., ... & Hengl, T. (2024). Time-series of Landsat-based bi-monthly and annual spectral indices for continental Europe for 2000–2022. Earth System Science Data Discussions, 2024, 1-49.  <Link href="https://doi.org/10.5194/essd-17-741-2025" target="_blank" color="selected">https://doi.org/10.5194/essd-17-741-2025</Link>.
            </li>
          </ul>
        </Typography>
      </Stack>


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
        <Stack direction="row" spacing={2} alignItems="center">
          <Link href="https://www.ukri.org/" target="_blank"><img src="/ukri.png" width="240" /></Link>
          <Link href="https://eidc.ac.uk/" target="_blank"><img src="https://eidc.ac.uk/sites/default/files/UKCEH_EIDC_logo_CMYK_small.png" width="240" /></Link>
        </Stack>
        <Typography color="secondary" fontSize={'12px'}>
          This work has received funding from <Link href="https://www.ukri.org/apply-for-funding/horizon-europe/" target="_blank" color="selected" >UK Research and Innovation (UKRI) under the UK government’s Horizon Europe funding </Link> guarantee [grant numbers 10053484, 1005216, 1006329].        </Typography>

        <Typography color="secondary" fontSize={'12px'}>
          <Link href="https://catalogue.ceh.ac.uk/documents/79669141-cde5-49f0-b24d-f3c6a1a52db8" target="_blank" color="selected">Countryside Survey</Link>: Emmett, B.A.; Reynolds, B.; Chamberlain, P.M.; Rowe, E.; Spurgeon, D.; Brittain, S.A.; Frogbrook, Z.; Hughes, S.; Lawlor, A.J.; Poskitt, J.; Potter, E.; Robinson, D.A.; Scott, A.; Wood, C.M.; Woods, C. (2016). Soil physico-chemical properties 2007 [Countryside Survey] . NERC Environmental Information Data Centre. <Link href="https://doi.org/10.5285/79669141-cde5-49f0-b24d-f3c6a1a52db8" target="_blank" color="selected">https://doi.org/10.5285/79669141-cde5-49f0-b24d-f3c6a1a52db8</Link>
        </Typography>

        <Typography color="secondary" fontSize={'12px'}>
           <Link href="https://catalogue.ceh.ac.uk/documents/0fa51dc6-1537-4ad6-9d06-e476c137ed09" target="_blank" color="selected">Welsh Government soil data</Link>: Robinson, D.A.; Astbury, S.; Barrett, G.; Burden, A.; Carter, H.; Emmett, B.A.; Garbutt, A.; Giampieri, C.; Hall, J.; Henrys, P.A.; Hughes, S.; Hunt, A.; Jarvis, S.G.; Jones, D.L.; Keenan, P.; Lebron, I.; Nunez, D.; Owen, A.; Patel, M.; Pereira, M.G.; Seaton, F.; Sharps, K.; Tanna, B.; Thompson, N.; Williams, B.; Wood, C.M. (2019). Topsoil physico-chemical properties from the Glastir Monitoring and Evaluation Programme, Wales 2013-2016. NERC Environmental Information Data Centre. <Link href="https://doi.org/10.5285/0fa51dc6-1537-4ad6-9d06-e476c137ed09" target="_blank" color="selected">https://doi.org/10.5285/0fa51dc6-1537-4ad6-9d06-e476c137ed09</Link>
        </Typography>

      </Stack>


      <Stack spacing={1}>
        <Typography color="secondary" fontSize={'12px'}>

          <Link fontWeight="bold" href="https://ecodatacube.eu/" color="selected">EcoDataCube hosted at ecodatacube.eu</Link> comprises environmental, land cover, terrain, climatic, soil and vegetation layers covering the continental Europe at relatively fine spatial resolutions (30-m to 1-km). It has been produced within the CEF Telecom project <Link color="selected" fontWeight="bold" href="https://ec.europa.eu/inea/en/connecting-europe-facility/cef-telecom/2018-eu-ia-0095" >2018-EU-IA-0095</Link>: “Geo-harmonizer: EU-wide automated mapping system for harmonization of Open Data based on FOSS4G and Machine”. Use it to visualize and serve spatiotemporal datasets for the periods 2000–2020 and beyond and share it with your colleagues. Predictions are typically based on using Ensemble Machine Learning applied to large spatiotemporal training datasets, often derived through other European Commission funded projects such as the <Link href="https://ec.europa.eu/eurostat/web/lucas" color="selected" fontWeight="bold">LUCAS</Link> (Land Use and Coverage Area frame Survey), and the <Link color="selected" fontWeight="bold" href="https://land.copernicus.eu/">Copernicus Land Monitoring Service</Link>. The Earth Observation data used to generate predictions is primarily based on the <Link color="selected" href="https://www.glad.umd.edu/ard/home" fontWeight={"bold"}>GLAD Landsat ARD imagery</Link> and <Link href="https://sentinel.esa.int/web/sentinel/sentinel-data-access" color="selected" fontWeight="bold">ESA Sentinel</Link> products. To report an issue or a bug please use gitlab. Have a new similar data set that you would like to publish on the ecodatacube.eu data portal? Please <Link color="selected" fontWeight="bold" href="https://opengeohub.org/contact-us/" >contact us</Link>.        </Typography>
      </Stack>

      <Stack spacing={1} justifyContent="center" alignItems="center">
        <a class="clustrmaps" target="_blank" href="https://clustrmaps.com/site/1c5a6" title="Visit tracker"><img src="//clustrmaps.com/map_v2.png?cl=080808&amp;w=360&amp;t=n&amp;d=nYAAEACPORTUZ0jyzFuPujUsfFCV52FWPoiyzUoaegc&amp;co=ffffff&amp;ct=808080" /></a>
      </Stack>

    </Stack>
  )
}

export default AboutTab;