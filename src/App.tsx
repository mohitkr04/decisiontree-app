import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from './components/ui/toaster';
import ErrorBoundary from './components/ErrorBoundary';

// Page imports
import Landing from './pages/Landing';
import Home from './pages/Home';
import About from './pages/About';
import Learn from './pages/Learn';
import BuildTree from './pages/BuildTree';
import Examples from './pages/Examples';
import Games from './pages/Games';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/build-tree" element={<BuildTree />} />
            <Route path="/examples" element={<Examples />} />
            <Route path="/games" element={<Games />} />
          </Route>
        </Routes>
        <Toaster />
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
