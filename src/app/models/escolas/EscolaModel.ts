import { ContactModel } from "../base/ContactModel";
import { AddressModel } from "../base/AddressModel";

export class EscolaModel {
    public ID_ESCOLA: number;
    public NM_ESCOLA: string;
    public RG_MEC: string;
    public ID_TIPO_ESCOLA: number;
    public OBS: string;
    public STS_ESCOLA: number;
    public ID_USU: number;
    public DT_CAD: Date;
    public DT_ULT_ALT: Date;
    public enderecos: AddressModel[] = [];
    public contatos: ContactModel[] = [];
    public Termo: string;

    public telefone: ContactModel;
    public celular: ContactModel;
    public email: ContactModel;

    public static IsEmpty(escola: EscolaModel) {
        return !escola || !escola?.RG_MEC || escola?.RG_MEC == "000.000.000-00";
    }

}