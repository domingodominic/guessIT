import { Box } from "@mui/material";
import "../style/style.css";
import React from "react";
import SplashLoader from "../loaders/SplashLoader";

function SplashScreen() {
  return (
    <div className="splash--container">
      <div>
        <Box
          component="img"
          sx={{
            height: 233,
            width: 300,
            borderRadius: 100,
            maxHeight: { xs: 233, md: 167 },
            maxWidth: { xs: 350, md: 250 },
          }}
          alt="The house from the offer."
          src="https://th.bing.com/th/id/OIG4.nOTtN2ciN7X6olXELHE0?w=270&h=270&c=6&r=0&o=5&dpr=1.9&pid=ImgGn"
        />
        <div className="flex center mt-10">
          <SplashLoader />
        </div>
      </div>
    </div>
  );
}

export default SplashScreen;
