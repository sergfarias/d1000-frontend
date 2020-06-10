import {Component, OnInit, Input, EventEmitter, Output, ViewChild, Inject, ɵConsole,} from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";

import { AddressModel } from "app/models/base/AddressModel";
import { AlunoModel } from "app/models/alunos/AlunoModel";
import { MensagemService } from "app/shared/mensagem/mensagem.service";
import { FormUtilService } from "app/shared/form-utils.service";
import { AddressService } from "app/services/address.service";
import { ClientesService } from "app/services/clientes.service";
import { AlunosService } from "app/services/alunos.service";

import { ContactService } from "app/services/contact.service";
import { LocalStorageService } from "angular-2-local-storage";
import { AddressGridComponent } from "../address-grid/address-grid.component";
import { ContactModel } from "app/models/base/ContactModel";
import { Router } from "@angular/router";
import { UrlRepositoryService } from "app/services/url-repository.service";
import { formatDate } from "@angular/common";

const CPF = "000.000.000-00";
const CNPJ = "00.000.000/0000-00";
const CELULAR = "(00) 00000-0000";
const TELEFONE = "(00) 0000-0000";

@Component({
  selector: "aluno",
  templateUrl: "./aluno.component.html",
  styleUrls: ["./aluno.component.scss"],
})
export class AlunoComponent implements OnInit {
  @Output() returnsearch = new EventEmitter<any>();

  //chamo componente
  @ViewChild(AddressGridComponent, { static: false })
  childC: AddressGridComponent;

  /* Flag de Controle */
  BuscandoAluno: boolean = false;

  cnpjCpfMask = CPF;
  CNPJ_CPF = "";
  ID_CONTATO = 0;
  ID_TIPO_CONTATO = "";
  DS_CONTATO = "";
  previusLength = 0;

  listOrgaoExpedidor: any[] = [];
  listTipoSexo: any[] = [];
  listTipoContato: any[] = [];
  formCadastroAluno: FormGroup;
  public enderecos: AddressModel[] = [];
  public contatos: FormArray;
  private modeloApi: AlunoModel = new AlunoModel();
  alunoData: AlunoModel;

  NM_ALUNO = "";
  DT_NASC: Date; 
  public VISIBLE: boolean = false;
  readonly: boolean;
  checked: boolean;
  myDate : Date = new Date();

  public constructor(
    private dialog: MatDialogRef<AlunoComponent>,
    private formBuilder: FormBuilder,
    private addressService: AddressService,
    private contactService: ContactService,
    //private clienteService: ClientesService,
    private alunoService: AlunosService,
    private formUtil: FormUtilService,
    private router: Router,
    private url: UrlRepositoryService,
    private mensagem: MensagemService,
    public local: LocalStorageService
  ) {}

  getMascara(c: any, i: any) {
    if (!c) return;
    let ID_TIPO_CONTATO = c.value?.ID_TIPO_CONTATO;
    if (ID_TIPO_CONTATO == 1) return CELULAR;
    else if (ID_TIPO_CONTATO == 2) return TELEFONE;
    else null;
  }

  keyPress(event: KeyboardEvent) {
    const pattern = /[0-9]|\//;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  onCnpjCpfChanged() {
    if (this.CNPJ_CPF.length <= 11 && this.cnpjCpfMask === CNPJ) {
      this.cnpjCpfMask = CPF;
      this.VISIBLE = false; // esconde razao social
    } else if (
      this.CNPJ_CPF.length === 11 &&
      this.cnpjCpfMask === CPF &&
      this.previusLength === 11
    ) {
      this.cnpjCpfMask = CNPJ;
      this.VISIBLE = true; //aparece razao social
    }

    this.previusLength = this.CNPJ_CPF.length;
  }

  private get modelo(): AlunoModel {
    let model = Object.assign(this.modeloApi, this.formCadastroAluno.value);
    model.enderecos = this.childC.dataTable;
    model.ID_ALUNO =
      this.alunoData != null ? this.alunoData.ID_ALUNO : 0;
    model.contatos = model.contatos.filter((c) => c.ID_TIPO_CONTATO != null);
    return model;
  }

  private set modelo(modelo: AlunoModel) {
    this.modeloApi = modelo;

    this.formCadastroAluno.patchValue({
      ID_ALUNO: modelo.ID_ALUNO,
      NM_ALUNO: modelo.NM_ALUNO,
      DT_NASC: formatDate(modelo.DT_NASC, 'dd/MM/yyyy', 'pt-BR'), //modelo.DT_NASC,
      DT_CAD: modelo.DT_CAD,
      CNPJ_CPF: modelo.CNPJ_CPF,
      RG: modelo.RG,
      ID_SIGLA_ORG_EXP: modelo.ID_SIGLA_ORG_EXP,
      OBS: modelo.OBS,
      STS_CLIENTE: true,
      ID_TIPO_SEXO: modelo.ID_TIPO_SEXO,
      ID_USU: modelo.ID_USU,
      enderecos: modelo.enderecos,
      contatos: modelo.contatos,
    });
  }

  buildForm() {
    /*constrói o formulário reativo*/
    this.formCadastroAluno = this.formBuilder.group({
      ID_ALUNO: [null],
      ID_TIPO_ALUNO: [1],
      CNPJ_CPF: [null],
      DT_CAD: [new Date()],
      NM_ALUNO: [null],
      DT_NASC: [null, Validators.nullValidator],
      RG: [null],
      ID_SIGLA_ORG_EXP: [null],
      ID_TIPO_SEXO: [null],
      OBS: [null],
      STS_ALUNO: [true],
      ID_USU: [1],
      TERMO: [null],
      enderecos: this.formBuilder.array([]),
      contatos: this.formBuilder.array([this.createContact()]),
    });
  }

  createContact(): FormGroup {
    return this.formBuilder.group({
      ID_CONTATO: [0],
      ID_TIPO_CONTATO: [null],
      DS_CONTATO: [""],
    });
  }

  public addNewContact(): void {
    this.contatos = this.formCadastroAluno.get("contatos") as FormArray;
    this.contatos.push(this.createContact());
  }

  ngOnInit()
   {
    console.log("teste")
    this.buildForm();
    this.recuperarDropdownOrgaoExpedidor();
    this.recuperarDropdownTipoSexo();
    this.recuperarDropdownTipoContato();
  }

  /* /////////////////////////////// */

  closeDialog() {
    this.dialog.close({});
  }

  recuperarDropdownOrgaoExpedidor() {
    this.addressService
      .recuperarDropdownOrgaoExpedidor()
      .subscribe((values) => {
        this.listOrgaoExpedidor = values;
      });
  }

  recuperarDropdownTipoSexo() {
    this.addressService.recuperarDropdownTipoSexo().subscribe((values) => {
      this.listTipoSexo = values;
    });
  }

  recuperarDropdownTipoContato() {
    this.contactService.recuperarDropdownTipoContato().subscribe((values) => {
      this.listTipoContato = values;
    });
  }

  public onSubmit(): void {
    this.formUtil.verificaValidacoes(this.formCadastroAluno);

    if (this.formCadastroAluno.valid) this.inserirOuAtualizar();
    else this.mensagem.enviar("Existem campos inválidos", false);
  }

  private inserirOuAtualizar(): void {
    if (!this.alunoData) {
      console.log("inclusao");
      this.alunoService.inserir(this.modelo).subscribe(
        () => {
          this.mensagem.enviar("Dados inseridos com sucesso.");
        },
        (error) => {
          this.mensagem.enviar("Falha na inclusão do cliente.", false);
          console.log(error);
        }
      );
    } else {
      this.alunoService.atualizar(this.modelo).subscribe(
        () => {
          this.mensagem.enviar("Dados atualizados com sucesso.");
          this.router.navigateByUrl(this.url.Clientes.Detalhes);
        },
        (error) => {
          this.mensagem.enviar("Falha na atualização do aluno", false);
          console.log(error);
        }
      );
    }
  }

  PesquisarLogradouroGrid(): void {
    this.formUtil.verificaValidacoes(this.formCadastroAluno);
    if (this.formCadastroAluno.value.CNPJ_CPF != null) {
      this.alunoService
        .PesquisarClienteContato(this.formCadastroAluno.value.CNPJ_CPF)
        .subscribe((value) => {
          this.PreencherDadosAlunoContato(value.Data);
        });

      this.BuscandoAluno = true;

      this.alunoService
        .PesquisarClienteFidelidade(this.formCadastroAluno.value.CNPJ_CPF)
        .subscribe((value) => {
          this.BuscandoAluno = false;

          if (value.Data == null) {
            this.mensagem.enviar(
              "Aluno informado não existe ou não encontrado.",
              false
            );
            return;
          }

          this.alunoData = value.Data;

          console.log("teste1");
          if (value.Data != null) {
            /* Converter campo de data de nascimento */
            value.Data.DT_NASC = new Date(value.Data.DT_NASC);
            this.preencherDadosAluno(value.Data);
          }
        });

      this.addressService
        .PesquisarAlunoLogradouroGrid(this.formCadastroAluno.value.CNPJ_CPF)
        .subscribe(
          (value) => {
            this.childC.preencherDados(value.Data);
          },
          (error) => {
            this.mensagem.enviar(
              "Aluno informado não existe ou não encontrado.",
              false
            );
            console.log(error);
          }
        );
    } else {
      this.mensagem.enviar(
        "O campo com a pesquisa deve ser preenchido.",
        false
      );
    }
  }


  /**
   * Após realizar a busca pelo cpf/cnpj, os dados do cliente são preenchidos nos inputs.
   */
  preencherDadosAluno(search: AlunoModel) {
    this.formCadastroAluno.get("ID_ALUNO").patchValue(search.ID_ALUNO);
    this.formCadastroAluno.get("NM_ALUNO").patchValue(search.NM_ALUNO);
    this.formCadastroAluno.get("RG").patchValue(search.RG);
    this.formCadastroAluno.get("ID_SIGLA_ORG_EXP").patchValue(search.ID_SIGLA_ORG_EXP);
    this.formCadastroAluno.get("ID_TIPO_SEXO").patchValue(search.ID_TIPO_SEXO);
    this.formCadastroAluno.get("DT_CAD").patchValue(search.DT_CAD);
    this.formCadastroAluno.get("OBS").patchValue(search.OBS);
    this.formCadastroAluno.get("DT_NASC").patchValue(search.DT_NASC); 
    this.DT_NASC = search.DT_NASC; // formatDate(search.DT_NASC, 'dd/MM/yyyy', 'pt-BR');
  }

  /**
   * Após realizar a busca pelo cpf/cnpj, os dados do contato do cliente são preenchidos nos inputs.
   */
  PreencherDadosAlunoContato(search: any) {
    if (search != null) {
      var saida: Array<ContactModel>[] = [];
      //for (let i = 0; i < (Object.values(search.query).length/12); i++) {
      //pego cada linha vetor
      var customObj: Array<ContactModel> = [];
      Object.keys(search.query).forEach(function (keys) {
        customObj[keys] = search.query[keys];
      });
      saida.push(customObj);
      //}

      for (let c = 0; c < Object.values(search.query).length - 1; c++) {
        this.addNewContact();
      }
      this.formCadastroAluno.get("contatos").patchValue(saida[0]);
    }
  }

}
