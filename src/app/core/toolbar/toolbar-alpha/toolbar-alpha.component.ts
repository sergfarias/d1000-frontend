import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { ROUTE_TRANSITION } from '../../../app.animation';
import escape from 'lodash-es/escape';

//import { IdSellerComponent } from '../../../pages/balcao/id-seller/id-seller.component';
//import { ClientRegisterComponent } from '../../../pages/balcao/client-register/client-register.component';
//import { PrescriberRegisterComponent } from '../../../pages/balcao/prescriber-register/prescriber-register.component';
//import { AuthFarmaciaPopularComponent } from '../../../pages/balcao/auth-farmacia-popular/auth-farmacia-popular.component';
//import { AuthPBMComponent } from '../../../pages/balcao/auth-pbm/auth-pbm.component';
//import { BudgetSearchComponent } from '../../../pages/balcao/budget-search/budget-search.component';
//import { TelaOrcamentoService } from 'app/services/telaorcamento.service';
//import { PBMCancelComponent } from "../../../pages/balcao/pbm-cancel/pbm-cancel.component";
//import { PBMHistoryComponent } from "../../../pages/balcao/pbm-history/pbm-history.component";
//import { ChargebackFarmaciaPopularComponent } from "../../../pages/balcao/chargeback-farmacia-popular/chargeback-farmacia-popular.component";

@Component({
  selector: 'elastic-toolbar-alpha',
  templateUrl: './toolbar-alpha.component.html',
  styleUrls: ['./toolbar-alpha.component.scss']
})
export class ToolbarAlphaComponent implements OnInit {

  @Input() sidenavCollapsed: boolean;
  @Input() quickpanelOpen: boolean;
  @Output() toggledSidenav = new EventEmitter();
  @Output() toggledQuickpanel = new EventEmitter();

  constructor(
    public dialog: MatDialog,
    //public telaOrcamento: TelaOrcamentoService
  ) { }

  /* Dropdown */
  isOpen: boolean;

  /* Dialogs */
  ModalOpen: boolean = false;

  ngOnInit() {
    this.isOpen = false;
  }

  /* /////////////////////////////// */

  

  /* /////////////////////////////// */

  // dialogClientRegister() {
  //   const dialogRef = this.dialog.open(ClientRegisterComponent, {
  //     id: 'client-register'
  //   });

  //   this.ModalOpen = true;

  //   dialogRef.afterClosed().subscribe(r => this.ModalOpen = false);
  // }

  /* /////////////////////////////// */

  
  


  /* /////////////////////////////// */

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  onClickOutside() {
    this.isOpen = false;
  }

  toggleSidenav() {
    this.toggledSidenav.emit();
  }

  toggleQuickpanel() {
    this.toggledQuickpanel.emit();
  }
}
