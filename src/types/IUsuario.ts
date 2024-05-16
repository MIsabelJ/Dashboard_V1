import { IBaseEntity } from "./IBaseEntity";

export interface IUsuario extends IBaseEntity {
    actions: string;
    active: boolean;
}