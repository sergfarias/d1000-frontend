import { Component, OnInit, Input, ViewChild, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddressModel } from 'app/models/base/AddressModel';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AddressService } from 'app/services/address.service';
import { FormUtilService } from 'app/shared/form-utils.service';
import { MensagemService } from 'app/shared/mensagem/mensagem.service';
import { AddressGridComponent } from '../address-grid/address-grid.component';

@Component({
  selector: 'app-address-register',
  templateUrl: './address-register.component.html',
  styleUrls: ['./address-register.component.scss']
})
export class AddressRegisterComponent implements OnInit {

  listUFLogradouro: any[] = [];
  formCadastroEndereco: FormGroup;
  private modeloApi: AddressModel = new AddressModel();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private dialog: MatDialogRef<AddressRegisterComponent>,
    private formBuilder: FormBuilder,
    private addressService: AddressService,
    private formUtil: FormUtilService
  ) {}

  ngOnInit(): void {
    this.buildForm();

    this.recuperarDropdownUFLogradouro();

    if(this.data[0]) {
      this.modelo = this.data[0];
    }

    this.preencherDados(this.modelo);
  }

  private get modelo(): AddressModel {
    return Object.assign(this.modeloApi, this.formCadastroEndereco.value) as AddressModel;
  }

  private set modelo(modelo: AddressModel) {
    console.log("modelo>>", modelo);
    this.modeloApi = modelo;

    this.formCadastroEndereco.patchValue({
        ID_LOGRADOURO: modelo.ID_LOGRADOURO,
        CEP: modelo.CEP,
        LOGRADOURO: modelo.LOGRADOURO,
        BAIRRO: modelo.BAIRRO,
        NOME_CIDADE: modelo.NOME_CIDADE,
        ID_UF: modelo.ID_UF,
        SIGLA_UF: modelo.SIGLA_UF,
        NR_LOGRADOURO: modelo.NR_LOGRADOURO,
        CPL_LOGRADOURO: modelo.CPL_LOGRADOURO,
        PONTO_REFERENCIA: modelo.PONTO_REFERENCIA,
        RADIO: modelo.RADIO
    });
  }

  buildForm() {
    /*constrói o formulário reativo*/
    this.formCadastroEndereco = this.formBuilder.group({
        ID_LOGRADOURO: [null],
        CEP: [null],
        LOGRADOURO: [null],
        BAIRRO: [null],
        NOME_CIDADE: [null],
        ID_UF: [null],
        SIGLA_UF: [null],
        NR_LOGRADOURO: [null],
        CPL_LOGRADOURO: [null],
        PONTO_REFERENCIA: [null],
        TERMO: [null]
    });
  }

  /**
     * Após realizar a busca pelo cep, os dados do logradouro são preenchidos nos inputs.
    */

   preencherDados(search: AddressModel) {
    this.formCadastroEndereco.get('ID_LOGRADOURO').patchValue(search.ID_LOGRADOURO);
    this.formCadastroEndereco.get('CEP').patchValue(search.CEP);
    this.formCadastroEndereco.get('LOGRADOURO').patchValue(search.LOGRADOURO);
    this.formCadastroEndereco.get('BAIRRO').patchValue(search.BAIRRO);
    this.formCadastroEndereco.get('NOME_CIDADE').patchValue(search.NOME_CIDADE);
    this.formCadastroEndereco.get('ID_UF').patchValue(search.ID_UF);
    this.formCadastroEndereco.get('NR_LOGRADOURO').patchValue(search.NR_LOGRADOURO);
    this.formCadastroEndereco.get('CPL_LOGRADOURO').patchValue(search.CPL_LOGRADOURO);
    this.formCadastroEndereco.get('PONTO_REFERENCIA').patchValue(search.PONTO_REFERENCIA);
  }

  public onSubmit(): void {
    this.formUtil.verificaValidacoes(this.formCadastroEndereco);
    this.closeDialog(this.modelo);
  }

  closeDialog(model) {
    this.dialog.close(model);
 }

 recuperarDropdownUFLogradouro() {
  this.addressService
  .recuperarDropdownUFLogradouro()
  .subscribe(values => {
      this.listUFLogradouro = values;
  });
}

}
