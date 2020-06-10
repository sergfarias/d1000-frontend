import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UrlRepositoryService } from "./url-repository.service";
import { LocalStorageService } from "angular-2-local-storage";
import { Observable } from "rxjs";
import { AlunoModel } from "app/models/alunos/AlunoModel";
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
export class AlunosService extends BaseFormService<AlunoModel> {
  constructor(
    public http: HttpClient,
    public url: UrlRepositoryService,
    public local: LocalStorageService
  ) {
    super(http, url);
  }

  inserir(model): Observable<any> {
    return this.http.post(this.url.Alunos.CadastroAluno, model);
  }

  atualizar(model): Observable<any> {
    return this.http.put(this.url.Alunos.AtualizaAluno, model);
  }

  public PesquisarAluno(Termo): Observable<AlunoModel[]> {
    let url = "";

    if (isNaN(parseInt(Termo)))
      url =
        this.url.Alunos.PesquisaTermo + "?Termo=" + encodeURIComponent(Termo);
    else url = this.url.Alunos.PesquisaCodigo + "?Codigo=" + Termo;

    return this.http.get<AlunoModel[]>(url);
  }

  public PesquisarAlunoCampo(Termo, Campo): Observable<AlunoModel[]> {
    let url = ""; 
    if ((parseInt(Campo)==2) || (parseInt(Campo)==4)) //nome e telefone
       url = this.url.Alunos.PesquisaTermo + "?Termo=" + encodeURIComponent(Termo) + "&Campo=" + encodeURIComponent(Campo); 
   else //id ou CPF
       url = this.url.Alunos.PesquisaCodigo + "?Codigo=" + Termo;

   return this.http.get<AlunoModel[]>(url);
  }

  listarContato(): Observable<ContactModel[]> {
    return this.http.get<ContactModel[]>(`${this.url}`);
  }

  public Pesquisar(Termo): Observable<ApiResult<AlunoModel[]>> {
    let url = "";
    url = this.url.Clientes.Pesquisa + "?Termo=" + Termo;

    return this.http.get<ApiResult<AlunoModel[]>>(url);
  }

   public PesquisarClienteFidelidade(
     Termo
   ): Observable<ApiResult<AlunoModel>> {
     let url = "";
     url = this.url.Clientes.PesquisaClienteFidelidade + "?Termo=" + Termo;
     return this.http.get<ApiResult<AlunoModel>>(url);
   }

  public PesquisarClienteContato(Termo): Observable<ApiResult<ContactModel>> {
    let url = "";
    url = this.url.Clientes.PesquisaClienteContato + "?Termo=" + Termo;
    return this.http.get<ApiResult<ContactModel>>(url);
  }

}
