import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UrlRepositoryService } from "./url-repository.service";
import { LocalStorageService } from "angular-2-local-storage";
import { Observable } from "rxjs";
import { EscolaModel } from "app/models/escolas/EscolaModel";
import { TurmaModel } from "app/models/turmas/TurmaModel";
import { BaseFormService } from "./base-form.service";
import { ContactModel } from "app/models/base/ContactModel";

interface ApiResult<T> {
  sucesso: boolean;
  mensagem: string;
  Data: T;
}

@Injectable({
  providedIn: "root",
})
export class EscolasService extends BaseFormService<EscolaModel> {
  constructor(
    public http: HttpClient,
    public url: UrlRepositoryService,
    public local: LocalStorageService
  ) {
    super(http, url);
  }

  inserir(model): Observable<any> {
    return this.http.post(this.url.Escolas.CadastroEscola, model);
  }

  atualizar(model): Observable<any> {
    return this.http.put(this.url.Escolas.AtualizaEscola, model);
  }

  public PesquisarEscola(Termo): Observable<EscolaModel[]> {
    let url = "";

    if (isNaN(parseInt(Termo)))
      url =
        this.url.Escolas.PesquisaTermo + "?Termo=" + encodeURIComponent(Termo);
    else url = this.url.Escolas.PesquisaCodigo + "?Codigo=" + Termo;

    return this.http.get<EscolaModel[]>(url);
  }


  public PesquisarTurma(Escola): Observable<TurmaModel[]> {
    let url = "";

     url = this.url.Escolas.PesquisaTurma + "?Codigo=" + Escola;

    return this.http.get<TurmaModel[]>(url);
  }


  public PesquisarEscolaCampo(Termo, Campo): Observable<EscolaModel[]> {
    let url = ""; 
    if ((parseInt(Campo)==2) || (parseInt(Campo)==4)) //nome e telefone
       url = this.url.Escolas.PesquisaTermo + "?Termo=" + encodeURIComponent(Termo) + "&Campo=" + encodeURIComponent(Campo); 
   else //id ou CPF
       url = this.url.Escolas.PesquisaCodigo + "?Codigo=" + Termo;

   return this.http.get<EscolaModel[]>(url);
  }

  listarContato(): Observable<ContactModel[]> {
    return this.http.get<ContactModel[]>(`${this.url}`);
  }

  public Pesquisar(Termo): Observable<ApiResult<EscolaModel[]>> {
    let url = "";
    url = this.url.Escolas.Pesquisa + "?Termo=" + Termo;

    return this.http.get<ApiResult<EscolaModel[]>>(url);
  }

   public PesquisarEscolaFidelidade(
     Termo
   ): Observable<ApiResult<EscolaModel>> {
     let url = "";
     url = this.url.Escolas.PesquisaClienteFidelidade + "?Termo=" + Termo;
     return this.http.get<ApiResult<EscolaModel>>(url);
   }

  public PesquisarEscolaContato(Termo): Observable<ApiResult<ContactModel>> {
    let url = "";
    url = this.url.Escolas.PesquisaClienteContato + "?Termo=" + Termo;
    return this.http.get<ApiResult<ContactModel>>(url);
  }

   
}
