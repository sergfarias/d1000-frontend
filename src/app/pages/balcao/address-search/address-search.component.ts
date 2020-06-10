import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { AddressSearch } from './address-search.model';
import { MensagemService } from 'app/shared/mensagem/mensagem.service';
import { FormUtilService } from 'app/shared/form-utils.service';
import { AddressService } from '../../../services/address.service';
import { AddressModel } from 'app/models/base/AddressModel';

@Component({
    selector: 'app-address-search',
    templateUrl: './address-search.component.html',
    styleUrls: ['./address-search.component.scss']
})
export class AddressSearchComponent implements OnInit {

    @Input('formSearch') formSearch:FormGroup;

    @Output() returnsearch = new EventEmitter<any>();

    private _modelo:AddressSearch;

    get modelo():AddressSearch {
        let modelo = Object.assign(Object.assign({}, this._modelo), this.formSearch.value) as AddressSearch;

        //não precisa enviar de volta para api
        delete modelo.searchaddress;

        return modelo;
    }

    set modelo(modelo:AddressSearch) {
        console.log('> modelo:', modelo);
        this._modelo = modelo;
        this.formSearch.patchValue({
            searchaddress: modelo.searchaddress
        });
    }

    constructor(
        private formUtil:FormUtilService,
        private mensagem:MensagemService,
        private fb:FormBuilder,
        private AddressService: AddressService
    ) { }

    ngOnInit() {
        this.buildForm();

        this.formUtil.verificaValidacoes(this.formSearch);
    }

    buildForm():void{
        this.formSearch = this.fb.group({
          searchaddress:[null]
        });
    }

    PesquisarLogradouro():void {

            this.formUtil.verificaValidacoes(this.formSearch);
            if (this.formSearch.value.searchaddress != null) {
                const { searchaddress } = Object.assign({}, this.formSearch.value);

                this.AddressService.PesquisarLogradouro(searchaddress)
                .subscribe(value=>{
                    this.returnsearch.emit(value.Data);

                }, (error) => {
                    this.mensagem.enviar('CEP informado não existe ou não encontrado.', false);
                    console.log(error);
                });
            }
            else {
                this.mensagem.enviar('O campo com a pesquisa deve ser preenchido.', false);
            }
    }
}
