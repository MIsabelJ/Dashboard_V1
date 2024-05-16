import { IManufacturado } from "../types/IManufacturado";
import { BackendClient } from "./BackendClient";


export class ManufacturadoService extends BackendClient<IManufacturado> {

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