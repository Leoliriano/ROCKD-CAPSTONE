import { useState } from "react";
import { useDispatch } from "react-redux";
import { IconButton, Box, Typography, useTheme, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
// Assume `shades` is part of your custom theme and needs to be accessed via useTheme
import { addToCart } from "../state";
import { useNavigate } from "react-router-dom";

const Item = ({ item, width }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const theme = useTheme(); // Use the entire theme object

  // Use theme to access custom properties if `shades` is within your theme
  // Otherwise, keep using your imported `shades` for these values
  const backgroundColor = theme.shades?.neutral?.[100] ?? '#f0f0f0'; // Fallback color
  const countColor = theme.shades?.primary?.[300] ?? '#007bff'; // Fallback color, replace with your theme's color

  // Adjusting for proper image URL access based on potential Strapi v4 structure
  const imageUrl = item.attributes.image?.data?.attributes?.formats?.medium?.url ?? '/default-image.jpg';

  // Extracting other item attributes
  const { category, price, name, id } = item.attributes;

  return (
    <Box width={width}>
      <Box
        position="relative"
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
      >
        <img
          alt={name}
          width="300px"
          height="400px"
          src={`http://localhost:1337${imageUrl}`}
          onClick={() => navigate(`/item/${id}`)}
          style={{ cursor: "pointer" }}
        />
        <Box
          display={isHovered ? "block" : "none"}
          position="absolute"
          bottom="10%"
          left="0"
          width="100%"
          padding="0 5%"
        >
          <Box display="flex" justifyContent="space-between">
            <Box
              display="flex"
              alignItems="center"
              backgroundColor={backgroundColor} // Now using the corrected variable
              borderRadius="3px"
            >
              <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                <RemoveIcon />
              </IconButton>
              <Typography color={countColor}>{count}</Typography> {/* Adjusted color access */}
              <IconButton onClick={() => setCount(count + 1)}>
                <AddIcon />
              </IconButton>
            </Box>
            <Button
              onClick={() => dispatch(addToCart({ item: { ...item, count } }))}
              sx={{ backgroundColor: countColor, color: "white" }} // Adjusted color access
            >
              Add to Cart
            </Button>
          </Box>
        </Box>
      </Box>

      <Box mt="3px">
        <Typography variant="subtitle2" color={theme.palette.neutral?.dark ?? '#000'}> {/* Example of using a custom property */}
          {category.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}
        </Typography>
        <Typography>{name}</Typography>
        <Typography fontWeight="bold">{price}</Typography>
      </Box>
    </Box>
  );
};

export default Item;
