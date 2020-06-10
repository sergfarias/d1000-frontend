import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject, pipe } from "rxjs";
import { LocalStorageService } from "angular-2-local-storage";
import { UrlRepositoryService } from "./url-repository.service";
import { AddressModel } from "app/models/base/AddressModel";
import { BaseFormService } from "./base-form.service";

interface ApiResult<T>{
  sucesso:boolean;
  mensagem:string;
  Data:T;
}

@Injectable({
  providedIn: "root"
})
export class AddressService extends BaseFormService<AddressModel> {
  
  constructor(
    public http: HttpClient,
    public url: UrlRepositoryService,
    public local: LocalStorageService,
  ){
    super(http, url);
  }

  recuperarDropdownUFLogradouro(): Observable<any> {   
    return this.http.get(`${this.url.Base.UFLogradouro}`); 
  }

  recuperarDropdownOrgaoExpedidor(): Observable<any> {   
    return this.http.get(`${this.url.Base.OrgaoExpedidor}`); 
  }

  recuperarDropdownTipoSexo(): Observable<any> {   
    return this.http.get(`${this.url.Base.TipoSexo}`); 
  }

  public PesquisarLogradouro(Termo): Observable<ApiResult<AddressModel[]>> {
    let url = "";
    url = this.url.Base.PesquisaLogradouro + "?Termo=" + Termo;
  
    return this.http.get<ApiResult<AddressModel[]>>(url);
  }

  public PesquisarEscolaLogradouroGrid(Termo): Observable<ApiResult<AddressModel[]>> {
    let url = "";
    url = this.url.Base.PesquisaEscolaLogradouroGrid + "?Termo=" + Termo;
  
    return this.http.get<ApiResult<AddressModel[]>>(url);
  }

  public PesquisarAlunoLogradouroGrid(Termo): Observable<ApiResult<AddressModel[]>> {
    let url = "";
    url = this.url.Base.PesquisaAlunoLogradouroGrid + "?Termo=" + Termo;
  
    return this.http.get<ApiResult<AddressModel[]>>(url);
  }

  public PesquisarLograClienteGrid(id_logradouro,id_cliente): Observable<ApiResult<AddressModel>> {
    let url = "";
    url = this.url.Base.PesquisaLograClienteGrid + "?id_logradouro=" + id_logradouro + "&id_cliente="+ id_cliente;
  
    return this.http.get<ApiResult<AddressModel>>(url);
  }
}
