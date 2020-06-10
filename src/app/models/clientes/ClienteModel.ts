import { ContactModel } from "../base/ContactModel";
import { AddressModel } from "../base/AddressModel";
//import { PesquisaConvenioModel } from "../convenios/PesquisaConvenioModel";

export class ClienteModel {
    public ID_CLIENTE: number;
    public ID_FILIAL: number;
    public RZ_CLIENTE: string;
    public NM_FANTASIA: string;
    public DT_NASC: Date;
    public CNPJ_CPF: string;
    public INSC_EST: string;
    public INSC_MUNI: string;
    public RG: string;
    public ID_SIGLA_ORG_EXP: number;
    public ID_TIPO_PESSOA: number;
    public ID_TIPO_CLIENTE: number;
    public ID_REGIAO: number;
    public OBS: string;
    public STS_CLIENTE: number;
    public ID_TIPO_SEXO: number;
    public ENVIAR_XML_NFE: boolean;
    public ACEITA_MKT_ATIVO: boolean;
    public FML_FID: boolean;
    public DML_FID: boolean;
    public TMO_FID: boolean;
    public RSO_FID: boolean;
    public ID_USU: number;
    public DT_CAD: Date;
    public DT_ULT_ALT: Date;
    public enderecos: AddressModel[] = [];
    public contatos: ContactModel[] = [];
    public Termo: string;

    public telefone: ContactModel;
    public celular: ContactModel;
    public email: ContactModel;

    public static IsEmpty(cliente: ClienteModel) {
        return !cliente || !cliente?.CNPJ_CPF || cliente?.CNPJ_CPF == "000.000.000-00";
    }

}