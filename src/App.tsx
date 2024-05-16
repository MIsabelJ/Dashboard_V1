import 'bootstrap/dist/css/bootstrap.min.css';
import { Box } from '@mui/material';
import PersistentDrawerLeft from './components/ui/Sidebar/Sidebar.tsx';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/pages/Login/Login.tsx';
import { SeccionEmpresa } from './components/pages/Empresa/SeccionEmpresa.tsx';
import SeccionSucursal from './components/pages/Sucursal/SeccionSucursal.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/login" element={<Login />} />
        <Route path="/companies" element={<SeccionEmpresa/>} />
        <Route path="/companies/branches" element={<SeccionSucursal/>} />
        <Route
          path="/app"
          element={
            <Box sx={{ display: 'flex' }}>
              <PersistentDrawerLeft />
            </Box>
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;