import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { LocalStorageService } from 'angular-2-local-storage';

import { AddressService } from 'app/services/address.service';
import { AddressRegisterComponent } from '../address-register/address-register.component';
import { AddressModel } from 'app/models/base/AddressModel';
import { Subject } from 'rxjs';
import { MensagemService } from 'app/shared/mensagem/mensagem.service'; 

@Component({
  selector: 'app-address-grid',
  templateUrl: './address-grid.component.html',
  styleUrls: ['./address-grid.component.scss']
})

export class AddressGridComponent implements OnInit{
  
  // Flag de controle de modal
  ModalOpen: boolean = false;
  displayedColumns = ['RADIO','CEP', 'LOGRADOURO', 'NR_LOGRADOURO', 'CPL_LOGRADOURO', 'BAIRRO', 'NOME_CIDADE', 'SIGLA_UF'];
  public dataTable: AddressModel[];
  public dataSource: MatTableDataSource<AddressModel>;

  selectedAddress: string = "";
  AddressRegisterAwaiter: Subject<any> = new Subject<any>();
  valdata: AddressModel;
  storedradiosel: string;
  checked:boolean = false;

  constructor(
    private dialog: MatDialog,
    private addressService: AddressService,
    public local: LocalStorageService,
    public change: ChangeDetectorRef,
    private mensagem: MensagemService
  ) { }

   ngOnInit(): void {
     this.AddressRegisterAwaiter.subscribe(resp => {
       if(!resp)
        return;

      this.atualizarGrid(resp);
     });
   }

   private checkedAddressId: number;

  /**
     * Após realizar a busca pelo cpf/cnpj, os dados do logradouro são preenchidos nos inputs.
    */
   preencherDados(search) {
    var saida: Array<AddressModel>[]=[];
     for (let i = 0; i < (Object.values(search.query).length/13); i++) {
                  //pego cada coluna
                  var customObj: Array<AddressModel>=[];
                  Object.keys(search.query).forEach(function (keys){
                       customObj[keys] = search.query[keys];
                  });
                  saida.push(customObj);
      }
      
    this.dataTable = saida[0];   
    this.dataSource = new MatTableDataSource<any>(this.dataTable);
  }

  atualizarGrid(modelo: AddressModel) {
    
    if(!this.dataTable)
      this.dataTable = [];

    let endereco = this.dataTable.filter(v => v.ID_LOGRADOURO == modelo.ID_LOGRADOURO);

    if(endereco.length == 0) {
      modelo.RADIO = false;
      this.dataTable.push(modelo);    
    }
    else {
      let value = endereco[0];
      modelo.RADIO = false;
      Object.assign(value, modelo);
    }
   
    this.dataSource = new MatTableDataSource<any>(this.dataTable);
    this.change.markForCheck();
  }

  searchSelectedAddressRegister(radioselected:any){
    if(radioselected != null && radioselected != undefined && radioselected != "") {

    this.storedradiosel = radioselected.ID_LOGRADOURO;

    this.valdata = radioselected; 
    this.dialogAddressRegister();
    }
    else {
      this.mensagem.enviar('Selecione o endereço que deseja editar.', false);
    }
  }

  dialogAddressRegister() {
    const dialogRef = this.dialog.open(AddressRegisterComponent, {
         id: 'address-register',
         data: [
          this.valdata = this.valdata
        ]
    });

    this.ModalOpen = true;
    dialogRef.afterClosed().subscribe(
      resp => {
        this.AddressRegisterAwaiter.next(resp);

        this.ModalOpen = false
      });
}

  radioChangeHandler(row: any, event: any) {
    this.selectedAddress = row;
    this.checkedAddressId = row.ID_LOGRADOURO;
  }

  public selectAddress(ID_LOGRADOURO: number) {
    this.checkedAddressId = ID_LOGRADOURO;

    let enderecos = this.dataSource.data.filter(s => s.ID_LOGRADOURO);
    
    if(enderecos.length > 0) {
      let endereco = enderecos[0];
      this.selectedAddress = `${endereco.ID_LOGRADOURO},${endereco.ID_CLIENTE},${endereco.CEP},${endereco.LOGRADOURO},${endereco.NR_LOGRADOURO},${endereco.CPL_LOGRADOURO},${endereco.PONTO_REFERENCIA},${endereco.BAIRRO},${endereco.NOME_CIDADE},${endereco.SIGLA_UF}`;
    }
  }
}
