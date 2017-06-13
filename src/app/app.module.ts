import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DataTableModule, SharedModule, DropdownModule, TabViewModule, DialogModule, ButtonModule, PickListModule, CalendarModule } from 'primeng/primeng';
import { AppComponent } from './app.component';
import { LoginComponent } from './modelos/login/login.component';
import { GestaoUsersComponent } from './modelos/gestao-users/gestao-users.component';
import { TipoPausaComponent } from './modelos/tipo-pausa/tipo-pausa.component';
import { NovaOperacaoComponent } from './modelos/nova-operacao/nova-operacao.component';
import { RegistoQuantidadesComponent } from './modelos/registo-quantidades/registo-quantidades.component';
import { LoginService } from "app/LoginService";
import { RouterModule, Routes } from "@angular/router";
import { OperacaoEmCursoComponent } from "./modelos/operacao-em-curso/operacao-em-curso.component";
import { ClickOutsideModule } from 'ng-click-outside';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Angular2FontAwesomeModule } from 'angular2-font-awesome/angular2-font-awesome';
import { utilizadorService } from "app/utilizadorService";
import 'rxjs/add/operator/toPromise';
import { ofService } from "app/ofService";
import { ControloComponent } from './modelos/controlo/controlo.component';
import {ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';
import { PageloginComponent } from './modelos/pagelogin/pagelogin.component';
import { RPCONFUTZPERFService } from "app/modelos/services/rp-conf-utz-perf.service";
import { RPCONFCHEFSECService } from "app/modelos/services/rp-conf-chef-sec.service";
import { RPCONFOPService } from "app/modelos/services/rp-conf-op.service";
import { RPCONFOPNPREVService } from "app/modelos/services/rp-conf-op-nprev.service";
import { RPOFCABService } from "app/modelos/services/rp-of-cab.service";
import { RPOFOPCABService } from "app/modelos/services/rp-of-op-cab.service";
import { RPOFOPLINService } from "app/modelos/services/rp-of-op-lin.service";
import { RPOFPREPLINService } from "app/modelos/services/rp-of-prep-lin.service";

const routes: Routes = [
  {
    path: 'nova-operacao',
    component: NovaOperacaoComponent,
    canActivate: [LoginService]
  },
  {
    path: 'home',
    component: LoginComponent
  },
  {
    path: 'operacao-em-curso',
    component: OperacaoEmCursoComponent,
    canActivate: [LoginService]
  },
  {
    path: 'gestao-users',
    component: GestaoUsersComponent,
    canActivate: [LoginService]
  },
  {
    path: 'pausa',
    component: TipoPausaComponent,
    canActivate: [LoginService]
  },
  {
    path: 'registo-quantidades',
    component: RegistoQuantidadesComponent,
    canActivate: [LoginService]
  },
  {
    path: 'controlo',
    component: ControloComponent,
    canActivate: [LoginService]
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full'
  }
]


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GestaoUsersComponent,
    TipoPausaComponent,
    NovaOperacaoComponent,
    RegistoQuantidadesComponent,
    OperacaoEmCursoComponent,
    LoginComponent,
    ControloComponent,
    PageloginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    DataTableModule,
    DropdownModule,
    ClickOutsideModule,
    BrowserAnimationsModule,
    DialogModule,
    Angular2FontAwesomeModule,
    ButtonModule,
    TabViewModule,
    PickListModule,
    CalendarModule,
    ConfirmDialogModule,
    [RouterModule.forRoot(routes)]
  ],
  providers: [ConfirmationService,
  LoginService, 
  utilizadorService, 
  ofService,
  RPCONFUTZPERFService,
  RPCONFCHEFSECService,
  RPCONFOPService,
  RPCONFOPNPREVService,
  RPOFCABService,
  RPOFOPCABService,
  RPOFOPLINService,
  RPOFPREPLINService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
