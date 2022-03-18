import React from "react";

import {
  BrowserRouter as Router,
  Routes as RRoutes,
  Route,
} from "react-router-dom";

import Landing from "pages/Landing";
import OrphanagesMap from "pages/OrphanagesMap";

const Routes = () => {
  return (
    <Router>
      <RRoutes>
        <Route path="/" element={<Landing />} />
        <Route path="/app" element={<OrphanagesMap />} />
      </RRoutes>
    </Router>
  );
};

export default Routes;
