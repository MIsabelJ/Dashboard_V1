import { IBaseEntity } from "./IBaseEntity";

export interface IPromocion extends IBaseEntity {
    image: string;
    since: string;
    until: string;
    description: string;
    price: number;
    actions: string;
    active: boolean;
}