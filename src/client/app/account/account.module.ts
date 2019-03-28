import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ActivateComponent} from './activate/activate.component';
import {RegisterComponent} from './register/register.component';
import {PasswordComponent} from './password/password.component';
import {PasswordStrengthBarComponent} from './password/password-strength-bar.component';
import {PasswordResetInitComponent} from './password-reset/init/password-reset-init.component';
import {PasswordResetFinishComponent} from './password-reset/finish/password-reset-finish.component';
import {SettingsComponent} from './settings/settings.component';
import {YcpOlmphSharedModule} from '../shared/shared.module';
import {accountState} from './account.route';
import {LoginComponent} from './login/login.component';

@NgModule({
  imports: [YcpOlmphSharedModule, RouterModule.forChild(accountState)],
  declarations: [
    ActivateComponent,
    RegisterComponent,
    PasswordComponent,
    PasswordStrengthBarComponent,
    PasswordResetInitComponent,
    PasswordResetFinishComponent,
    SettingsComponent,
    LoginComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class YcpolmphAccountModule {
}
