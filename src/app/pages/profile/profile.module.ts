import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button'; 
import { MatChipsModule } from '@angular/material/chips'; 
import { MatIconModule } from '@angular/material/icon'; 
import {   MatTabsModule } from '@angular/material/tabs';
import { ProfileOverviewComponent } from './profile-overview/profile-overview.component';
import { BreadcrumbsModule } from '../../core/breadcrumbs/breadcrumbs.module';
import { PageHeaderModule } from '../../core/page-header/page-header.module';
import { ProfileRoutingModule } from './profile.routing';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FlexLayoutModule,
    PageHeaderModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatChipsModule,
    BreadcrumbsModule
  ],
  declarations: [ProfileComponent, ProfileOverviewComponent]
})
export class ProfileModule { }
