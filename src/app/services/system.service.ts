import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject, pipe } from "rxjs";
import { map } from "rxjs/operators";
import { LocalStorageService } from "angular-2-local-storage";
import { UrlRepositoryService } from "./url-repository.service";
import { SystemConfigModel } from "app/models/system/SystemConfigModel";

@Injectable({
  providedIn: "root",
})
export class SystemService {
  constructor(
    private http: HttpClient,
    private url: UrlRepositoryService,
    private local: LocalStorageService
  ) {
      // Carregar configurações do sistema

      this.Config = new SystemConfigModel();

      this.Config.ID_FILIAL = 9;
  }

  public Config: SystemConfigModel;
  
}
