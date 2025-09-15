import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import CustomerApp from './CustomerApp';
import AdminApp from './admin/AdminApp';

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: 'rgba(26, 26, 26, 0.9)',
            color: '#f5f5f0',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            backdropFilter: 'blur(10px)',
          },
        }}
      />
      
      <Routes>
        <Route path="/admin/*" element={<AdminApp />} />
        <Route path="/*" element={<CustomerApp />} />
      </Routes>
    </>
  );
}

export default App;