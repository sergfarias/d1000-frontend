import { HttpParams } from "@angular/common/http";

export class AddressModel {
    public ID_CLIENTE_LOGRADOURO: number;
    public ID_LOGRADOURO: string;
    public ID_CLIENTE: string;
    public CEP: string;
    public LOGRADOURO: string;
    public BAIRRO: string;
    public NOME_CIDADE: string;
    public ID_UF: string;
    public SIGLA_UF: string;
    public NR_LOGRADOURO: string;
    public CPL_LOGRADOURO: string;
    public PONTO_REFERENCIA: string;
    public TERMO: string;
    public RADIO: boolean;
    
    transformarEmHttpParams():HttpParams{
        let params = new HttpParams();

        if(this.SIGLA_UF )
            params = params.append('SIGLA_UF', this.SIGLA_UF);

        return params;
    }

}