import { AfterViewInit, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Subject } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { ROUTE_TRANSITION } from '../../../app.animation';
import escape from 'lodash-es/escape';

import { LocalStorageService } from 'angular-2-local-storage';


@Component({
  selector: 'elastic-toolbar-user-button',
  templateUrl: './toolbar-user-button.component.html',
  styleUrls: ['./toolbar-user-button.component.scss']
})
export class ToolbarUserButtonComponent implements OnInit, AfterViewInit {

  isOpen: boolean;

  constructor(
    public Auth: AuthService,
    public Change: ChangeDetectorRef,
    public dialog: MatDialog,
    public change: ChangeDetectorRef,
    public local: LocalStorageService
  ) {
  }

  IsAuthenticated: boolean = this.Auth.IsAuthenticated ? true : false;
  UserName: string = this.Auth.CurrentUser?.name;

  /* Flag de controle de modal */
  ModalOpen: boolean = false;

  ngOnInit() {
    this.Auth.OnLoginSuccess.subscribe(currentUser => {
      console.log(this.IsAuthenticated);
      console.log(this.UserName);

      this.IsAuthenticated = true;
      this.UserName = currentUser.name;

      this.Change.markForCheck();
    });

    this.Auth.OnLogout.subscribe(currentUser => {
      this.IsAuthenticated = false;
      this.UserName = "";

      this.isOpen = false;

      this.Change.markForCheck();
    });
  }



  /* /////////////////////////////// */

  ngAfterViewInit() {
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  onClickOutside() {
    this.isOpen = false;
  }

  public Logout() {
    this.Auth.Logout();
  }

}
