import { Link, Stack, Typography } from "@mui/material";

function LegalTab(props) {
  return (
    <Stack sx={{ padding: '20px' }} spacing={2}>

      <Typography color="secondary" fontSize={'12px'}>
      <Link fontWeight="bold" href="https://ecodatacube.eu/" color="selected">EcoDataCube.eu</Link> is an is an Open Data portal, mainly inspired by the  <Link fontWeight="bold" href="https://openlandmap.org/" color="selected">OpenLandMap.org</Link> and <Link fontWeight="bold" href="https://openlandmap.org/" color="selected">OpenStreetMap.org</Link> projects. If not otherwise specified, the data available on this portal is licensed under the <Link fontWeight="bold" href="https://opendatacommons.org/licenses/odbl/" color="selected">Open Data Commons Open Database License (ODbL)</Link> and/or <Link fontWeight="bold" href="https://creativecommons.org/licenses/by-sa/4.0/legalcode" color="selected">Creative Commons Attribution-ShareAlike 4.0</Link> and/or <Link fontWeight="bold" href="https://creativecommons.org/licenses/by/4.0/legalcode" color="selected">Creative Commons Attribution 4.0</Link> International license (CC BY). This means that you are free to use OpenDataScience.eu data for any purpose as long as you credit OpenDataScience.eu and its contributors. If the data is available under the CC BY-SA license, this implies that if you alter or build upon the data in certain ways, you may distribute the result only under the same licence.
      </Typography>

      <Typography color="secondary" fontSize={'12px'}>
        To access data for operational projects we recommend using the EcoDataCube.eu Cloud-Optimized GeoTIFF service. This allows you to query, subset, overlay and download smaller chunks of data without a need to download Terabytes. Please refer to this <Link color="selected" fontWeight="bold" href="https://gitlab.com/geoharmonizer_inea/spatial-layers">tutorial</Link> to learn how to access and use the data in an optimal manner.
      </Typography>

      <Typography color="secondary" fontSize={'12px'}>
        This site and many other related services are formally operated by the GeoHarmonizer project consortium on behalf of the community. Use of all OpenGeoHub Foundation operated services is subject to our <Link color="selected" fontWeight="bold"  href="https://opengeohub.org/about/">Terms & Conditions</Link> and our <Link color="selected" fontWeight="bold"  href="https://opengeohub.org/privacy-policy/">Privacy Policy</Link>.
      </Typography>
      <Typography color="secondary" fontSize={'12px'}>
        Please contact the <Link color="selected" fontWeight="bold"  href="https://opengeohub.org/about/">OpenGeoHub Foundation</Link> and <Link color="selected" fontWeight="bold"  href="http://geomatics.fsv.cvut.cz/department-of-geomatics/">CVUT Prague</Link> if you have any licensing, copyright or other legal questions.
      </Typography>
      <Typography color="secondary" fontSize={'12px'}>
        © Copyright <Link color="selected" fontWeight="bold"  href="https://opengeohub.org/about/">OpenGeoHub</Link> & <Link color="selected" fontWeight="bold"  href="http://geomatics.fsv.cvut.cz/department-of-geomatics/">CVUT Prague</Link> & <Link color="selected" fontWeight="bold"  href="https://mundialis.de/en/">mundialis</Link> & <Link color="selected" fontWeight="bold"  href="http://www.terrasigna.com/">Terrasigna</Link> & <Link color="selected" fontWeight="bold"  href="http://www.multione.hr/eng.html">MultiOne</Link> 2020–2022.
      </Typography>
      <Typography color="secondary" fontSize={'12px'}>
        The back-end and front-end solution for ecodatacube.eu was co-developed jointly with <Link href="https://gilab.rs" color="selected" fontWeight="bold">GiLAB</Link>.
      </Typography>



    </Stack>
  )
}

export default LegalTab;