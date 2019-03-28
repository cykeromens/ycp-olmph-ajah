import {NgModule} from '@angular/core';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
// import {CookieModule} from 'ngx-cookie';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {LoginComponent} from '../account/login/login.component';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {BsDropdownModule} from 'ngx-bootstrap';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    // CookieModule.forRoot(),
    FontAwesomeModule,
    BsDropdownModule.forRoot()
  ],
  entryComponents: [LoginComponent],
  exports: [FormsModule, CommonModule, NgbModule, FontAwesomeModule, BsDropdownModule]
})
export class SharedLibsModule {
}


