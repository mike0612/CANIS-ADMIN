import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { PageLoadingModule } from './../shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        LoginRoutingModule,
        PageLoadingModule,
        NgbModule,
        FormsModule,
        SweetAlert2Module
    ],
    declarations: [LoginComponent]
})
export class LoginModule {}
