import {NgModule} from '@angular/core';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
// import {CookieModule} from 'ngx-cookie';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {LoginComponent} from '../account/login/login.component';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {BsDropdownModule} from 'ngx-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import {FormWizardModule} from 'angular-wizard-form/dist';
// import {NgJhipsterModule} from 'ng-jhipster';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    FormWizardModule,
    // NgJhipsterModule.forRoot({
    //   // set below to true to make alerts look like toast
    //   alertAsToast: false,
    //   alertTimeout: 5000
    // }),
    NgbModule,
    // CookieModule.forRoot(),
    FontAwesomeModule,
    BsDropdownModule.forRoot()
  ],
  entryComponents: [LoginComponent],
  exports: [FormsModule, FormWizardModule, CommonModule, NgbModule, FontAwesomeModule, BsDropdownModule, HttpClientModule]
})
export class SharedLibsModule {
}


