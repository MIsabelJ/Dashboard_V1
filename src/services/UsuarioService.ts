import { IUsuario } from "../types/IUsuario";
import { BackendClient } from "./BackendClient";


export class UsuarioService extends BackendClient<IUsuario> {}