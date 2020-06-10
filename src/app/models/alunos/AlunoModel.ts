import { ContactModel } from "../base/ContactModel";
import { AddressModel } from "../base/AddressModel";

export class AlunoModel {
    public ID_ALUNO: number;
    public NM_ALUNO: string;
    public DT_NASC: Date;
    public CNPJ_CPF: string;
    public RG: string;
    public ID_SIGLA_ORG_EXP: number;
    public OBS: string;
    public STS_ALUNO: number;
    public ID_TIPO_SEXO: number;
    public ID_USU: number;
    public DT_CAD: Date;
    public DT_ULT_ALT: Date;
    public enderecos: AddressModel[] = [];
    public contatos: ContactModel[] = [];
    public Termo: string;
    public telefone: ContactModel;
    public celular: ContactModel;
    public email: ContactModel;

    public static IsEmpty(aluno: AlunoModel) {
        return !aluno || !aluno?.CNPJ_CPF || aluno?.CNPJ_CPF == "000.000.000-00";
    }

}