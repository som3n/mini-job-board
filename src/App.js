import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Homepage from './components/Homepage';
import AddJob from './components/AddJob';
import JobDetails from './JobDetails';
import Navbar from './components/Navbar';

function App() {
    return (
        <Router>
          <Navbar/>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/add-job" element={<AddJob />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default App;
