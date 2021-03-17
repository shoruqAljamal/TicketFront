import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShowClientComponent } from './show-client/show-client.component';
import { ShowAdminComponent } from './show-admin/show-admin.component';
import { HttpClientModule } from '@angular/common/http';
import { UserServiceService } from './Services/user-service.service';
import { AddEditTicketComponent } from './add-edit-ticket/add-edit-ticket.component';
import { DatePipe } from '@angular/common';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { MyTabelComponent } from './my-tabel/my-tabel.component';
import { IgxComboModule, IgxSwitchModule } from "igniteui-angular";
import { LoginService } from './Services/login.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComboBoxComponent } from './combo-box/combo-box.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ShowClientComponent,
    ShowAdminComponent,
    AddEditTicketComponent,
    AddAdminComponent,
    MyTabelComponent,
    ComboBoxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    IgxComboModule,
    IgxSwitchModule,
    BrowserAnimationsModule
  ],
  exports:[
    ShowClientComponent,
    ShowAdminComponent,
    RegisterComponent
  ],
  providers: [UserServiceService,HttpClientModule,DatePipe,NgbActiveModal,LoginService],
  bootstrap: [AppComponent],
  entryComponents: [AddEditTicketComponent,AddAdminComponent, ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
