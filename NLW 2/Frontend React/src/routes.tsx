import React from "react";
import {
  BrowserRouter as Router,
  Routes as RRoutes,
  Route,
} from "react-router-dom";

import Landing from "pages/Landing";
import TeacherList from "pages/TeacherList";
import TeacherForm from "pages/TeacherForm";

const Routes = () => {
  return (
    <Router>
      <RRoutes>
        <Route path="/" element={<Landing />} />
        <Route path="/study" element={<TeacherList />} />
        <Route path="/give-classes" element={<TeacherForm />} />
      </RRoutes>
    </Router>
  );
};

export default Routes;
