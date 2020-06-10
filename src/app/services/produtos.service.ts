import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject, pipe } from "rxjs";
import { map } from "rxjs/operators";
import { LocalStorageService } from "angular-2-local-storage";
import { UrlRepositoryService } from "./url-repository.service";

import { PesquisaProdutoModel } from "../models/produtos/PesquisaProdutoModel";
import { PrecoModel } from "app/models/produtos/PrecoModel";


@Injectable({
  providedIn: "root"
})
export class ProdutosService {
  constructor(
    private http: HttpClient,
    private url: UrlRepositoryService,
    private local: LocalStorageService
  ) {}

  public PesquisarProduto(Termo, Criterio = "1"): Observable<PesquisaProdutoModel[]> {
    let url = "";

    if (isNaN(parseInt(Termo)))
      url =
        this.url.Produtos.PesquisaTermo + "?Termo=" + encodeURIComponent(Termo) + "&Criterio=" + Criterio;
    else url = this.url.Produtos.PesquisaCodigo + "?Codigo=" + Termo;

    return this.http
      .get<PesquisaProdutoModel[]>(url);
  }

  public ObterPreco(CodigoProduto: number, Cliente: string) {
    let cpf = Cliente.replace(/\.|\-|\s/g, "");

    return this.http
      .post<PrecoModel[]>(this.url.Produtos.Preco, [{
        Cliente: cpf,
        Codigo: CodigoProduto,
        Quantidade: 1
      }]);
  }

  public ObterPrecos(Codigos: number[], Cliente: string): Observable<PrecoModel[]> {
    let cpf = Cliente.replace(/\.|\-|\s/g, "");

    return this.http
      .post<PrecoModel[]>(this.url.Produtos.Preco, Codigos.map(c => {
        return {
        Cliente: cpf,
        Codigo: c,
        Quantidade: 1
      }
    }));
  }

  public ObterProdutosEquivalentes(CodigoProduto: number) {
    let url = this.url.Produtos.Equivalentes + "?Codigo=" + CodigoProduto;

    return this.http
      .get<PesquisaProdutoModel[]>(url);
  }

  


}
