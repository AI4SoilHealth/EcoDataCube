import { Box, Link, List, ListItemText, Stack, Typography } from "@mui/material";

function DataAccess(props) {
  return (
    <Stack sx={{ padding: '20px' }} spacing={2}>



      <Typography color="secondary" fontSize={'12px'}>
        All spatial layers are publicly available via cloud-optimized formats and SpatioTemporal Asset Catalogs (STAC), enabling direct data access in multiple environments, including computation notebooks. We also have a QGIS Plugin for loading all spatial layers directly into QGIS.
        For more information check the following repositories:
        <ul>
          <li>Soil Health Data Cube: <Link href="https://github.com/AI4SoilHealth/SoilHealthDataCube" color="selected" fontWeight={'bold'}>https://github.com/AI4SoilHealth/SoilHealthDataCube</Link></li>
          <li>Soil Health Data Cube for pan-EU: <Link href="https://github.com/AI4SoilHealth/SHDC4EU_manual" color="selected" fontWeight={'bold'}>https://github.com/AI4SoilHealth/SHDC4EU_manual</Link></li>
          <li>OEMC QGIS plugin: <Link href="https://plugins.qgis.org/plugins/oemc-qgis-plugin-main" color="selected" fontWeight={'bold'}>https://plugins.qgis.org/plugins/oemc-qgis-plugin-main</Link></li>
          <li>GeoHarmonizer project: <Link href="https://gitlab.com/geoharmonizer_inea" color="selected" fontWeight={'bold'}>https://gitlab.com/geoharmonizer_inea</Link></li>
        </ul>
      </Typography>
    

      <Typography color="secondary" fontStyle="italic">GDAL Access</Typography>

      <Typography color="secondary" fontSize={'12px'}>
        The gdal_translate can be used to download data directly from a COG URL. You just need to pass the bounding box information via the "-projwin" parameter, informing the COG url prefixed by "/vsicurl/":
        <br />
        <br />
        <Box component={'code'} sx={{ fontSize: '12px !important', wordBreak: 'break-all', fontFamily: 'monospace !important' }}>gdal_translate -co COMPRESS=LZW -projwin 3949019.319534085 3274684.0278522763 3997655.528969183 3247994.5591947753 /vsicurl/https://s3.ecodatacube.eu/arco/lcv_landcover.hcl_lucas.corine.rf_p_30m_0..0cm_2019_eumap_epsg3035_v0.1.tif lcv_landcover_amsterdam.tif</Box>

      </Typography>

      <Typography color="secondary" fontStyle="italic">Python Access</Typography>

      <Typography color="secondary" fontSize={'12px'}>
        To query the data for any coordinate/point of EU check this <Link href="https://gitlab.com/geoharmonizer_inea/eumap/-/blob/master/demo/python/05_cloud_optimized_geotiff.ipynb" color="selected" fontSize="12px">Jupyter notebook tutorial</Link>

      </Typography>

      <Typography color="secondary" fontStyle="italic">R Access</Typography>

      <Typography color="secondary" fontSize={'12px'}>
        To access data from R using the terra package please use e.g.:
        <br />
        <br />
        <Box component={'code'} sx={{ fontSize: '12px !important', wordBreak: 'break-all', fontFamily: 'monospace !important' }}>library(terra) in.tif = "/vsicurl/https://s3.ecodatacube.eu/arco/lcv_landcover.hcl_lucas.corine.rf_p_30m_0..0cm_2019_eumap_epsg3035_v0.1.tif" tif = rast(in.tif)</Box>
        <br />
        <br />
        From here you can use any native operation e.g. to crop some polygon or resample / aggregate values.

      </Typography>

      <Typography fontSize="12px" color="secondary">
        If you experience any technical problems or if you discover a bug, please report <Link href="https://github.com/AI4SoilHealth/EcoDataCube" color="selected" fontWeight={'bold'}>here</Link>.
      </Typography>

    </Stack>
  )
}

export default DataAccess;