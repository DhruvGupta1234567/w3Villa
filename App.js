import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import Logins from './components/Logins';
import RegistrationForm from './components/RegistrationForm';
import TaskManager from './components/TaskManager';


function App() {
  
  return (
    <div className='main'>
    
      <Router>
        <Routes>
          {/* Other routes */}
          <Route path="/" element={<RegistrationForm/>} /> {/* Route for registration */}
          <Route path="/login" element={<Logins/>} />
          <Route path="/taskmanager" element={<TaskManager/>} />
          {/* Other routes */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;