import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter as MainRouter } from 'react-router-dom'
import { AppProviders } from "./context/AppProviders.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MainRouter>
      <AppProviders>
        <App />
      </AppProviders>
    </MainRouter>
  </React.StrictMode>
);