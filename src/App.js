import React from "react";

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Start from "./Components/Start/Start";
import Student from "./Components/Student/Student";
import Admin from "./Components/Admin/Admin";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Start />}/>
        <Route exact path="/student" element={<Student />}/>
        <Route exact path="/admin" element={<Admin />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
