import { IBaseEntity } from "./IBaseEntity";

export interface ISucursal extends IBaseEntity {
    address: string;
    image: string;
    active: boolean;
    company: number;
}