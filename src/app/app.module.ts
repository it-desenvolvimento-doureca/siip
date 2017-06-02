import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DataTableModule, SharedModule, DropdownModule, TabViewModule, DialogModule, ButtonModule, PickListModule } from 'primeng/primeng';
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
import { OperacaoEmCursoMultirefComponent } from './modelos/operacao-em-curso-multiref/operacao-em-curso-multiref.component';
import { ofService } from "app/ofService";
import { ControloComponent } from './modelos/controlo/controlo.component';

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
  }, {
    path: 'operacao-em-curso-multiref',
    component: OperacaoEmCursoMultirefComponent,
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
    OperacaoEmCursoMultirefComponent,
    ControloComponent
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
    [RouterModule.forRoot(routes)]
  ],
  providers: [LoginService, utilizadorService, ofService],
  bootstrap: [AppComponent]
})
export class AppModule { }
