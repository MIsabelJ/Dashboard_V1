import { IEmpresa } from './IEmpresa';
import { IPromocion } from './IPromociones';
import { ISucursal } from './ISucursal';
import { IUsuario } from './IUsuario';

export type Entidades = IUsuario | ISucursal | IEmpresa | IPromocion;
export interface IBaseEntity {
    id: number;
    name: string;
}