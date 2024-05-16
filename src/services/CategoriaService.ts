import { ICategories } from "../types/ICategories";
import { BackendClient } from "./BackendClient";


export class CategoriaService extends BackendClient<ICategories> {

    // Método para dada de baja lógica de un elemento por su ID
    async logicDelete(id: number): Promise<void> {
        const element = await this.getById(id);
        if (element) {
            element.active = false;
            await this.put(id, element);
        }
    }

    // Método para dada de alta lógica de un elemento por su ID
    async logicRestore(id: number): Promise<void> {
        const element = await this.getById(id);
        if (element) {
            element.active = true;
            await this.put(id, element);
        }
    }
}