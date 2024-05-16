import { Route, Routes } from "react-router-dom";
import Login from "../components/pages/Login/Login";
import { Box } from "@mui/material";
import PersistentDrawerLeft from "../components/ui/Sidebar/Sidebar";
// import SeccionSucursal from "../components/pages/Sucursal/SeccionSucursal";
import { SeccionEmpresa } from "../components/pages/Empresa/SeccionEmpresa";

export const AppRouter = () => {
  return (
    <div>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/companies" element={<SeccionEmpresa/>} />
        <Route path="/app"
          element={
            <Box sx={{ display: "flex" }}>
              <PersistentDrawerLeft />
              <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                {}
              </Box>
            </Box>
          }
        />
      </Routes>
    </div>
  );
};
