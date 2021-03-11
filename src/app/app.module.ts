import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShowClientComponent } from './show-client/show-client.component';
import { ShowAdminComponent } from './show-admin/show-admin.component';
import { HttpClientModule } from '@angular/common/http';
import { UserServiceService } from './Services/user-service.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ShowClientComponent,
    ShowAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  exports:[
    ShowClientComponent
  ],
  providers: [UserServiceService,HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
