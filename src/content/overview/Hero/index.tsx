// import { Button, Container, Grid, Typography } from "@mui/material";
// import { Link as RouterLink } from "react-router-dom";
// import { styled } from "@mui/material/styles";
// const TypographyH1 = styled(Typography)(
//   ({ theme }) => `
//     font-size: ${theme.typography.pxToRem(50)};
// `
// );

// const TypographyH2 = styled(Typography)(
//   ({ theme }) => `
//     font-size: ${theme.typography.pxToRem(17)};
// `
// );

// function Hero() {
//   return (
//     <Container maxWidth="lg" sx={{ textAlign: "center" }}>
//       <Grid
//         spacing={{ xs: 6, md: 10 }}
//         justifyContent="center"
//         alignItems="center"
//         container
//       >
//         <Grid item md={10} lg={8} mx="auto">
//           <img alt="404" height={180} src="/static/logo/tms.svg" />
//           <TypographyH1 sx={{ mb: 2 }} variant="h1">
//             Bus Transport System
//           </TypographyH1>
//           <TypographyH2
//             sx={{ lineHeight: 1.5, pb: 4 }}
//             variant="h4"
//             color="text.secondary"
//             fontWeight="normal"
//           >
//             Welcome to the Bus Transport System. Please log in to continue.
//           </TypographyH2>
//           <Button
//             component={RouterLink}
//             to="/login"
//             size="large"
//             variant="contained"
//           >
//             Log In
//           </Button>
//           <Grid container spacing={3} mt={5}>
//             <Grid item md={6}></Grid>
//           </Grid>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// }

// export default Hero;

import { Button, Container, Grid, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { styled } from "@mui/material/styles";

const TypographyH1 = styled(Typography)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(50)};
`
);

const TypographyH2 = styled(Typography)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(17)};
`
);

function Hero() {
  return (
    <Container maxWidth="lg" sx={{ textAlign: "center", paddingBottom: 0 }}>
      <Grid
        spacing={{ xs: 6, md: 10 }}
        justifyContent="center"
        alignItems="center"
        container
      >
        <Grid item md={10} lg={8} mx="auto">
          <img alt="404" height={180} src="/static/logo/tms.svg" />
          <TypographyH1 sx={{ mb: 2 }} variant="h1">
            Bus Transport System
          </TypographyH1>
          <TypographyH2
            sx={{ lineHeight: 1.5, pb: 4 }}
            variant="h4"
            color="text.secondary"
            fontWeight="normal"
          >
            Welcome to the Bus Transport System. Please log in to continue.
          </TypographyH2>
          <Button
            component={RouterLink}
            to="/login"
            size="large"
            variant="contained"
          >
            Log In
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Hero;
