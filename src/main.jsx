import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import './index.css'
// Components
import Nav from "./Nav";
import Mapa from "./views/mapa/Mapa";
import Lista from "./views/lista/Lista"

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Nav />
    <Routes>
      <Route path="/" element={<Mapa />} />
      <Route path="lista" element={<Lista />} />
    </Routes>
  </BrowserRouter>
)
