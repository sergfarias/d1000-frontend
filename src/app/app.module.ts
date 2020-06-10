import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PagesModule } from './pages/pages.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { AgmCoreModule } from '@agm/core';
import { RouteHandlerModule } from './core/route-handler/route-handler.module';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { LocalStorageModule } from 'angular-2-local-storage';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { AddressGridComponent } from './pages/balcao/address-grid/address-grid.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';

registerLocaleData(localePt, 'pt-BR');

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'elastic-ui' }),
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 50 }) : [],
    EffectsModule.forRoot([]),
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapsApiKey
    }),
    AppRoutingModule,
    CoreModule,
    PagesModule,
    RouteHandlerModule,
    LocalStorageModule.forRoot({
      prefix: "d1000",
      storageType: 'localStorage'
    }),
    MatSnackBarModule,
    MatDialogModule
  ],
  exports:[
    MatSnackBarModule,
    MatDialogModule
  ],
  providers: [
    CookieService,
    AddressGridComponent,
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
