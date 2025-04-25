import { Link, Stack, Typography } from "@mui/material";

function Disclaimer(props) {
  return (
    <Stack sx={{ padding: '20px' }} spacing={2}>

      <Typography color="secondary" fontSize={'12px'}>
      Funded by the European Union. Views and opinions expressed are however those of the author(s) only and do not necessarily reflect those of the European Union or European Commission. Neither the European Union nor the granting authority can be held responsible for them. The data is provided “as is”. OpenGeoHub and project consortium members and its suppliers and licensors hereby disclaim all warranties of any kind, express or implied, including, without limitation, the warranties of merchantability, fitness for a particular purpose and non-infringement. Neither OpenGeoHub nor its suppliers and licensors, makes any warranty that the Website will be error free or that access thereto will be continuous or uninterrupted. You understand that you download from, or otherwise obtain content or services through, the Website at your own discretion and risk.      </Typography>

      <Typography color="secondary" fontSize={'12px'}>
      Users are advised to contact the original data providers for original copies of point / tabular data indicated in the text above each imported dataset. If your data set is not cited correctly or you think is not imported and used correctly, please contact us (e-mail: <Link href="mailto:support@opendatascience.eu">support@opendatascience.eu</Link>) and we will do our best to adjust and correct. This site and many other related services are formally operated by the OpenGeoHub Foundation and CVUT Prague on behalf of the project consortium and community. Use of all OpenGeoHub Foundation operated services is subject to our <Link color="selected" fontWeight="bold"  href="https://opengeohub.org/about/">Terms & Conditions</Link> and our <Link color="selected" fontWeight="bold"  href="https://opengeohub.org/privacy-policy/">Privacy Policy</Link>.
      </Typography>

      <Typography color="secondary" fontSize={'12px'}>
      This is a pre-beta release of EcoDataCube. To report an issue or a bug please use <Link href="https://github.com/AI4SoilHealth/EcoDataCube" color="selected" fontWeight={'bold'}>github</Link>.
      </Typography>
  
      <img src="/disclaimer_image.png" />


    </Stack>
  )
}

export default Disclaimer;