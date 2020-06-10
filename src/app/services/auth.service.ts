import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject, pipe } from "rxjs";
import { map } from "rxjs/operators";
import { LocalStorageService } from "angular-2-local-storage";
import { UrlRepositoryService } from "./url-repository.service";
import { RetornoAutenticacaoModel } from "../models/autenticacao/RetornoAutenticacaoModel";
import { PermissionManager } from "app/models/autenticacao/PermissionManager";
import { MatDialog } from "@angular/material/dialog";
import { AuthUserModel } from "app/models/autenticacao/AuthUserModel";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private url: UrlRepositoryService,
    private local: LocalStorageService,
    public dialog: MatDialog,
  ) {

    let User = this.CheckLoginData();

    if(User) {
      this.Login(User);
    }

  }

  public IsAuthenticated: boolean = false;
  public Token: string = "";

  public CurrentUser: RetornoAutenticacaoModel = null;
  public Permissions: PermissionManager = null;

  public AuthUser: AuthUserModel;

  public OnLoginSuccess: Subject<RetornoAutenticacaoModel> = new Subject();
  public OnLogout: Subject<Boolean> = new Subject();



  /**
   * Realiza uma solicitação de autenticação.
   * @param Username Código do usuário.
   * @param Password Senha do usuário.
   * @param SetSession Indica se o usuário deverá ser definido na seção de login atual.
   */
  public TryAuthenticate(
    Username: string,
    Password: string,
    SetSession: boolean = true
  ): Observable<RetornoAutenticacaoModel> {
    return this.http
      .post<RetornoAutenticacaoModel>(null, {
        Usuario: Username,
        Senha: Password
      })
      .pipe(
        map((resp: RetornoAutenticacaoModel) => {
          if(!SetSession)
            return resp;

          this.Login(resp);

          this.SetLoginData(resp);

          return resp;
        })
      );
  }

  private Login(User: RetornoAutenticacaoModel) {
    this.IsAuthenticated = true;
    this.CurrentUser = User;
    this.Token = User.token;
    this.Permissions = new PermissionManager(User.permissoes);
    this.AuthUser = new AuthUserModel();

    this.OnLoginSuccess.next(User);
  }

  public Logout() {
    this.UnsetLoginData();

    this.IsAuthenticated = false;
    this.CurrentUser = null;

    this.OnLogout.next(true);
  }

  private CheckLoginData(): RetornoAutenticacaoModel {
    let User: RetornoAutenticacaoModel;

    if (this.local.get("CurrentUser"))
      User = this.local.get("CurrentUser") as RetornoAutenticacaoModel;
    else User = null;

    return User;
  }

  private SetLoginData(User: RetornoAutenticacaoModel) {
    this.local.set("CurrentUser", User);
  }

  private UnsetLoginData() {
    if (this.local.get("CurrentUser")) this.local.remove("CurrentUser");
  }
}
