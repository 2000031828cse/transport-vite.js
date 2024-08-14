// // import { Box, Container, Card } from '@mui/material';
// // import { Helmet } from 'react-helmet-async';

// // import { styled } from '@mui/material/styles';
// // import Hero from './Hero';

// // const OverviewWrapper = styled(Box)(
// //   () => `
// //     overflow: auto;
// //     flex: 1;
// //     overflow-x: hidden;
// //     align-items: center;
// // `
// // );

// // function Overview() {
// //   return (
// //     <OverviewWrapper>
// //       <Helmet>
// //         <title>bus transport system</title>
// //       </Helmet>
// //       <Container maxWidth="lg">
// //         <Box
// //           display="flex"
// //           justifyContent="center"
// //           py={5}
// //           alignItems="center"
// //         ></Box>
// //         <Card sx={{ p: 10, mb: 10, borderRadius: 12 }}>
// //           <Hero />
// //         </Card>
// //       </Container>
// //     </OverviewWrapper>
// //   );
// // }

// // export default Overview;

// import { Box, Container, Card } from "@mui/material";
// import { Helmet } from "react-helmet-async";
// import { styled } from "@mui/material/styles";
// import Hero from "./Hero";

// const OverviewWrapper = styled(Box)(
//   () => `
//     overflow: auto;
//     flex: 1;
//     overflow-x: hidden;
//     align-items: center;
//     justify-content:
//     background-color: white; /* Set background color to white */
// `
// );

// const CustomCard = styled(Card)(
//   () => `
//     padding: 10px;
//     margin-bottom: 10px;
//     border-radius: 12px;
//     background-color: white; /* Ensure background color is white */
//     border: none; /* Remove any border */
//     box-shadow: none; /* Remove any shadow that might look like a border */
// `
// );

// function Overview() {
//   return (
//     <OverviewWrapper>
//       <Helmet>
//         <title>Bus Transport System</title>
//       </Helmet>
//       <Container maxWidth="lg">
//         <Box
//           display="flex"
//           justifyContent="center"
//           py={5}
//           alignItems="center"
//         />
//         <CustomCard>
//           <Hero />
//         </CustomCard>
//       </Container>
//     </OverviewWrapper>
//   );
// }

// export default Overview;
import { Box, Container } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { styled } from "@mui/material/styles";
import Hero from "./Hero";

// const OverviewWrapper = styled(Box)(
//   ({ theme }) => `
//     overflow: auto;
//     flex: 1;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     background-color: white; /* Set background color to white */
//     padding: ${theme.spacing(3)};
//     height: 100vh; /* Ensures the height is full viewport height */
// `
// );

// const CenteredContainer = styled(Container)(
//   ({ theme }) => `
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     background-color: white; /* Ensure the container background is also white */
// `
// );

function Overview() {
  return (
    
    <Box sx={{
      backgroundColor: "#ffffff",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}>

      <Helmet>
        <title>Bus Transport System</title>
      </Helmet>
      
        <Hero />
      
    
    </Box>
  );
}

export default Overview;
