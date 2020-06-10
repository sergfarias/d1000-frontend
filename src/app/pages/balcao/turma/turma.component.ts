import {Component, OnInit, Input, EventEmitter, Output, ViewChild, Inject,} from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { AddressModel } from "app/models/base/AddressModel";
import { EscolaModel } from "app/models/escolas/EscolaModel";

import { MensagemService } from "app/shared/mensagem/mensagem.service";
import { FormUtilService } from "app/shared/form-utils.service";
import { AddressService } from "app/services/address.service";
import { EscolasService } from "app/services/escolas.service";
import { ContactService } from "app/services/contact.service";
import { LocalStorageService } from "angular-2-local-storage";
import { AddressGridComponent } from "../address-grid/address-grid.component";
import { MatRadioChange } from "@angular/material/radio";
import { ContactModel } from "app/models/base/ContactModel";
import { Router } from "@angular/router";
import { UrlRepositoryService } from "app/services/url-repository.service";

const CPF = "000.000.000-00";
const CNPJ = "00.000.000/0000-00";
const CELULAR = "(00) 00000-0000";
const TELEFONE = "(00) 0000-0000";

@Component({
  selector: "turma",
  templateUrl: "./turma.component.html",
  styleUrls: ["./turma.component.scss"],
})
export class TurmaComponent implements OnInit {
  @Output() returnsearch = new EventEmitter<any>();

  array = [
    { name: "Pública", key: 0, checked: false },
    { name: "Particular", key: 1, checked: false },
  ];

  //chamo componente
  @ViewChild(AddressGridComponent, { static: false })
  childC: AddressGridComponent;

  /* Flag de Controle */
  BuscandoEscola: boolean = false;

  cnpjCpfMask = CPF;
  RG_MEC = "";
  ID_CONTATO = 0;
  ID_TIPO_CONTATO = "";
  DS_CONTATO = "";
  previusLength = 0;

  ID_TIPO_ESCOLA = 0;

  listTipoContato: any[] = [];
  formCadastroTurma: FormGroup;
  public enderecos: AddressModel[] = [];
  public contatos: FormArray;
  private modeloApi: EscolaModel = new EscolaModel();
  escolaData: EscolaModel;

  NM_ESCOLA = "";
  DT_NASC: Date; 
  public VISIBLE: boolean = false;
  readonly: boolean;
  checked: boolean;
  myDate : Date = new Date();

  public constructor(
    private dialog: MatDialogRef<TurmaComponent>,
    private formBuilder: FormBuilder,
    private addressService: AddressService,
    private contactService: ContactService,
    private escolaService: EscolasService,
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
    if (this.RG_MEC.length <= 11 && this.cnpjCpfMask === CNPJ) {
      this.cnpjCpfMask = CPF;
      this.VISIBLE = false; // esconde razao social
      this.array[0].checked = true; // pessoa fisica
      this.array[1].checked = false; // pessoa juridica
    } else if (
      this.RG_MEC.length === 11 &&
      this.cnpjCpfMask === CPF &&
      this.previusLength === 11
    ) {
      this.cnpjCpfMask = CNPJ;
      this.VISIBLE = true; //aparece razao social
      this.array[0].checked = false; // pessoa fisica
      this.array[1].checked = true; // pessoa juridica
    }

    this.previusLength = this.RG_MEC.length;
  }

  private get modelo(): EscolaModel {
    let model = Object.assign(this.modeloApi, this.formCadastroTurma.value);
    model.enderecos = this.childC.dataTable;

    if  (this.array[0].checked) {model.ID_TIPO_ESCOLA = 4;}
    else {model.ID_TIPO_ESCOLA = 2;}

    model.ID_ESCOLA =
      this.escolaData != null ? this.escolaData.ID_ESCOLA : 0;
    model.contatos = model.contatos.filter((c) => c.ID_TIPO_CONTATO != null);
    return model;
  }

  private set modelo(modelo: EscolaModel) {
    this.modeloApi = modelo;
    this.formCadastroTurma.patchValue({
      ID_ESCOLA: modelo.ID_ESCOLA,
      NM_ESCOLA: modelo.NM_ESCOLA,
      DT_CAD: modelo.DT_CAD,
      RG_MEC: modelo.RG_MEC,
      ID_TIPO_ESCOLA: modelo.ID_TIPO_ESCOLA,
      OBS: modelo.OBS,
      STS_ESCOLA: true,
      ID_USU: modelo.ID_USU,
      enderecos: modelo.enderecos,
      contatos: modelo.contatos,
    });
  }

  buildForm() {
    /*constrói o formulário reativo*/
    this.formCadastroTurma = this.formBuilder.group({
      ID_ESCOLA: [null],
      ID_TIPO_ESCOLA: [1],
      RG_MEC: [null],
      DT_CAD: [new Date()],
      NM_ESCOLA: [null],
      OBS: [null],
      STS_ESCOLA: [true],
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
    this.contatos = this.formCadastroTurma.get("contatos") as FormArray;
    this.contatos.push(this.createContact());
  }

  ngOnInit() {
    this.buildForm();
    this.recuperarDropdownTipoContato();
  }

  closeDialog() {
    this.dialog.close({});
  }

  recuperarDropdownTipoContato() {
    this.contactService.recuperarDropdownTipoContato().subscribe((values) => {
      this.listTipoContato = values;
    });
  }

  public onSubmit(): void {
    this.formUtil.verificaValidacoes(this.formCadastroTurma);
    if (this.formCadastroTurma.valid) this.inserirOuAtualizar();
    else this.mensagem.enviar("Existem campos inválidos", false);
  }

  private inserirOuAtualizar(): void {
    console.log("1",this.escolaData)
    if (!this.escolaData) {

      this.escolaService.inserir(this.modelo).subscribe(
        () => {
          this.mensagem.enviar("Dados inseridos com sucesso.");
        },
        (error) => {
          this.mensagem.enviar("Falha na inclusão da turma.", false);
          console.log(error);
        }
      );
    } else {
      this.escolaService.atualizar(this.modelo).subscribe(
        () => {
          this.mensagem.enviar("Dados atualizados com sucesso.");
          this.router.navigateByUrl(this.url.Clientes.Detalhes);
        },
        (error) => {
          this.mensagem.enviar("Falha na atualização da turma", false);
          console.log(error);
        }
      );
    }
  }

  PesquisarLogradouroGrid(): void {
    console.log("2")
    this.formUtil.verificaValidacoes(this.formCadastroTurma);
    if (this.formCadastroTurma.value.RG_MEC != null) {
      this.escolaService
        .PesquisarEscolaContato(this.formCadastroTurma.value.RG_MEC)
        .subscribe((value) => {
          this.PreencherDadosClienteContato(value.Data);
        });

      this.BuscandoEscola = true;

      this.escolaService
        .PesquisarEscolaFidelidade(this.formCadastroTurma.value.RG_MEC)
        .subscribe((value) => {
          this.BuscandoEscola = false;

          if (value.Data == null) {
            this.mensagem.enviar(
              "Turma informada não existe ou não encontrada.",
              false
            );
            return;
          }

          this.escolaData = value.Data;

          if (value.Data != null) {
            if (value.Data.ID_TIPO_ESCOLA == 4) {
              this.array[0].checked = true;
              this.array[1].checked = false;
            } else {
              this.array[0].checked = false;
              this.array[1].checked = true;
            }

            /* Converter campo de data de nascimento */
            //value.Data.DT_NASC = new Date(value.Data.DT_NASC);

            this.preencherDadosCliente(value.Data);
          }
        });

      this.addressService
        .PesquisarEscolaLogradouroGrid(this.formCadastroTurma.value.RG_MEC)
        .subscribe(
          (value) => {
            this.childC.preencherDados(value.Data);
          },
          (error) => {
            this.mensagem.enviar(
              "Turma informada não existe ou não encontrada.",
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


  radioChange(event: MatRadioChange) {
    if (event.source.value.key == 0) {
      this.readonly = true;
      this.VISIBLE = false; // esconde razaõ social
      this.ID_TIPO_ESCOLA = 4;
    } else if (event.source.value.key == 1) {
      this.readonly = false;
      this.VISIBLE = true; //aparece razão social
      this.ID_TIPO_ESCOLA = 2;
    }
  }

  /**
   * Após realizar a busca pelo cpf/cnpj, os dados do cliente são preenchidos nos inputs.
   */
  preencherDadosCliente(search: EscolaModel) {
    this.formCadastroTurma.get("ID_ESCOLA").patchValue(search.ID_ESCOLA);
    this.formCadastroTurma.get("NM_ESCOLA").patchValue(search.NM_ESCOLA);
    this.formCadastroTurma.get("DT_CAD").patchValue(search.DT_CAD);
    this.formCadastroTurma.get("OBS").patchValue(search.OBS);
  }

  /**
   * Após realizar a busca pelo cpf/cnpj, os dados do contato do cliente são preenchidos nos inputs.
   */
  PreencherDadosClienteContato(search: any) {
    if (search != null) {
      var saida: Array<ContactModel>[] = [];
      //pego cada linha vetor
      var customObj: Array<ContactModel> = [];
      Object.keys(search.query).forEach(function (keys) {
        customObj[keys] = search.query[keys];
      });
      saida.push(customObj);
      
      for (let c = 0; c < Object.values(search.query).length - 1; c++) {
        this.addNewContact();
      }
      this.formCadastroTurma.get("contatos").patchValue(saida[0]);
    }
  }

}
