import { IBaseEntity } from "./IBaseEntity";

export interface IManufacturado extends IBaseEntity {
    price: number;
    description: string;
    category: string;
    image: string;
    stock: number;
    actions: string;
    active: boolean;
}