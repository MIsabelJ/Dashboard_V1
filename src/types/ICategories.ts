import { IBaseEntity } from "./IBaseEntity";

export interface ICategories extends IBaseEntity {
  subcategories?: ICategories[];
  active: boolean;
}
