import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BreadcrumbsModule } from '../../core/breadcrumbs/breadcrumbs.module';
import { PageHeaderModule } from '../../core/page-header/page-header.module';
import { MenuComponent } from '../../core/menu/menu.component';
import { MenuModule } from '../../core/menu/menu.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatButtonModule} from '@angular/material/button';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule} from '@angular/material/input';
import { MatNativeDateModule, MAT_DATE_FORMATS, DateAdapter } from '@angular/material/core';
 
import { MatRadioModule} from '@angular/material/radio';
import { MatSelectModule} from '@angular/material/select';
import { MatSliderModule} from '@angular/material/slider';
import { MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatTabsModule} from '@angular/material/tabs';
import { MatTooltipModule} from '@angular/material/tooltip';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatTableModule} from '@angular/material/table';
import { MatSpinner } from '@angular/material/progress-spinner';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MAT_DATE_LOCALE } from '@angular/material/core';

import { FormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { ReactiveFormsModule } from '@angular/forms';
import { UtilsModule } from '../../core/utils/utils.module';

import { ScrollbarModule } from '../../core/scrollbar/scrollbar.module';
import { CdkTableModule } from '@angular/cdk/table';

import { BalcaoRoutingModule } from './balcao.routing';
import { StoreFrontBudgetComponent } from './home/home.component';
import { ProductSearchComponent } from './product-search/product-search.component';
import { InputFieldSelectComponent } from 'app/shared/inputs/input-field-select/input-field-select.component';
import { ConfirmacaoComponent } from 'app/shared/mensagem/confirmacao.component';
import { AddressSearchComponent } from './address-search/address-search.component';
import { AddressRegisterComponent } from './address-register/address-register.component';
import { AddressGridComponent } from './address-grid/address-grid.component';
import { DatepickerMaskComponent } from 'app/shared/datepicker-mask/datepicker-mask.component';

import { EscolaComponent } from './escola/escola.component';
import { AlunoComponent } from './aluno/aluno.component';
import { TurmaComponent } from './turma/turma.component';

@NgModule({
  imports: [
    CommonModule,
    BalcaoRoutingModule,
    MenuModule,
    FormsModule,
    ReactiveFormsModule,
    BreadcrumbsModule,
    UtilsModule,
    FlexLayoutModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatTabsModule,
    PageHeaderModule,
    ScrollbarModule,
    CdkTableModule,
    MatPaginatorModule,
    MatTableModule,
    NgxMaskModule.forRoot() 
  ],
  declarations: [
    StoreFrontBudgetComponent,
    MenuComponent,
    ProductSearchComponent,
    MatSpinner,
    InputFieldSelectComponent,
    ConfirmacaoComponent,
    AddressSearchComponent,
    AddressRegisterComponent,
    AddressGridComponent,
    DatepickerMaskComponent, 
    EscolaComponent,
    AlunoComponent,
    TurmaComponent
  ],
  exports: [
  ],
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}},
    //{provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }
  ],
  entryComponents: [
    ConfirmacaoComponent
],
schemas: [
  CUSTOM_ELEMENTS_SCHEMA,
]
})
export class BalcaoModule { }
