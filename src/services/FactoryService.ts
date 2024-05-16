import { EmpresaService } from "./EmpresaService";
import { InsumoService } from "./InsumoService";
import { ManufacturadoService } from "./ManufacturadoService";
import { PromocionService } from "./PromocionService";
import { SucursalService } from "./SucursalService";
import { UsuarioService } from "./UsuarioService";
import { CategoriaService } from "./CategoriaService";

const API_URL = import.meta.env.VITE_API_URL;

const getServiceClass = (route: string) => {
  switch (route) {
    case "company":
      return EmpresaService as typeof EmpresaService;
    case "branch":
      return SucursalService as typeof SucursalService;
    case "manufactured":
      return ManufacturadoService as typeof ManufacturadoService;
    case "supplies":
      return InsumoService as typeof InsumoService;
    case "sales":
      return PromocionService as typeof PromocionService;
    case "users":
      return UsuarioService as typeof UsuarioService;
    case "categories":
      return CategoriaService as typeof CategoriaService;
    default:
      throw new Error(`Ruta no válida: ${route}`);
  }
};

export class FactoryService {
  static createService(route: string) {
    const ServiceClass = getServiceClass(route);
    return new ServiceClass(API_URL + "/" + route);
  }
}
