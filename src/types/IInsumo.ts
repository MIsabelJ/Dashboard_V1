import { IBaseEntity } from "./IBaseEntity";

export interface IInsumo extends IBaseEntity {
    price: number;
    description: string;
    category: string;
    isIngredient: boolean;
    image: string;
    stock: number;
    actions: string;
    active: boolean;
}