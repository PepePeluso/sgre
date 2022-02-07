import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap'
import 'react-loading-skeleton/dist/skeleton.css'
import 'jquery/dist/jquery'
import { AppRouter } from "./routes/AppRouter"

function App() {
  return (
    <div>
      <div>
        <AppRouter/>
      </div>
    </div>
  );
}

export default App;