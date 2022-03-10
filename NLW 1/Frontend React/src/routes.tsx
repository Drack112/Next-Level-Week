import React from "react";
import {
  BrowserRouter as Router,
  Routes as RRoutes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";
import CreatePoint from "./pages/CreatePoint";

const Routes = () => {
  return (
    <Router>
      <RRoutes>
        <Route path="/" element={<Home />} />
        <Route path="/create-point" element={<CreatePoint />} />
      </RRoutes>
    </Router>
  );
};

export default Routes;
