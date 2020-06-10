import { V_DML_BA_USU_PERMISSAO } from "./V_DML_BA_USU_PERMISSAO";

export class RetornoAutenticacaoModel {
    
    public token: string;

    public name: string;

    public permissoes: V_DML_BA_USU_PERMISSAO[];

    public codigo: number;

    public cdCargo: number;

    public dsCargo: string;

    public tipoCargo: number;

    public dsTipoCargo: string;

}