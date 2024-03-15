import { Box, Typography, IconButton, useMediaQuery } from '@mui/material';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { shades } from "../../theme";

// imports all image from assets folder
const importAll = (r) =>
 r.keys().reduce((acc, item) => {
    acc[item.replace("./", "")] = r(item);
    return acc;
 }, {});
  
 const heroTextureImports = importAll(
    require.context("../../assests", false, /\.(png|jpe?g|svg)$/)
 );

const MainCarousel = () => {
    const isNonMobile = useMediaQuery("(min-width:600px");

    return(
        <Carousel
         infiniteLoop={true}
         showThumbs={false}
         showIndicators={false}
         showStatus={false}
         renderArrowPrev={(onClickHandler, hasPrev, label) => (
            <IconButton
            >

            </IconButton>
         )}
        >

        </Carousel>
    )
}

export default MainCarousel;