import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SamplePage from './pages/sample';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sample" element={<SamplePage />} />
        {/* その他のルート */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;