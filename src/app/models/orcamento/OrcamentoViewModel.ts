import { ClienteModel } from "../clientes/ClienteModel";
import { OrcamentoItemViewModel } from "./OrcamentoItemViewModel";

export class OrcamentoViewModel {

    public constructor() {
        this.Itens = [];
    }

    public Cliente: ClienteModel
    public Itens: OrcamentoItemViewModel[]

}