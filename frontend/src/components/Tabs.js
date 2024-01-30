import React from "react";
import { Box } from "@mui/material";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

function Tabselection({ selectedTab, setSelectedTab }) {
  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  return (
    <div className="mt-20 mb-30">
      <Box sx={{ width: "100%" }}>
        <Tabs
          value={selectedTab ? selectedTab : "1"}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          <Tab value="one" label="Categories" />
          <Tab value="two" label="LeaderBoards" />
        </Tabs>
      </Box>
    </div>
  );
}

export default Tabselection;
