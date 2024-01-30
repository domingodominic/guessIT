import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { MdOutlineFavorite } from "react-icons/md";
import { MdOutlineFavoriteBorder } from "react-icons/md";

import Typography from "@mui/material/Typography";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#4f6f52",
  },
  "& .MuiRating-iconHover": {
    color: "#4f6f52",
  },
});

export default function Lives({ lives }) {
  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
      }}
    >
      <StyledRating
        name="customized-color"
        readOnly
        value={lives}
        getLabelText={(value) => `${value} Heart${value !== 1 ? "s" : ""}`}
        precision={0.5}
        icon={<MdOutlineFavorite fontSize="inherit" />}
        emptyIcon={<MdOutlineFavoriteBorder fontSize="inherit" />}
      />
    </Box>
  );
}
