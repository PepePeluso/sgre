import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
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