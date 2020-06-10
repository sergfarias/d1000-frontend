import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { UrlRepositoryService } from "./url-repository.service";


@Injectable({
  providedIn: "root"
})
export class OrcamentoService {
  constructor(
    private http: HttpClient,
    private url: UrlRepositoryService
  ) {}


}