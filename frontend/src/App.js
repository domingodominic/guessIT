import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "./components/Admin";
import Confetti from "./components/Confetti";
import Fastfood from "./components/Fastfood";
import SplashScreen from "./components/SplashScreen";
import Start from "./components/Start";
import Welcomepage from "./components/Welcomepage";

function App() {
  const [splashVisible, setSplashVisible] = useState(true);

  setTimeout(() => {
    setSplashVisible(false);
  }, 2000);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={splashVisible ? <SplashScreen /> : <Welcomepage />}
          />
          <Route path="confet" element={<Confetti />} />
          <Route path="admin" element={<Admin />} />
          <Route path="start" element={<Start />} />
          <Route path="fastfood" element={<Fastfood />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
