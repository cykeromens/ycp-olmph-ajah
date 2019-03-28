import {Routes} from '@angular/router';
import {activateRoute} from './activate/activate.route';
import {passwordRoute} from './password/password.route';
import {passwordResetFinishRoute} from './password-reset/finish/password-reset-finish.route';
import {passwordResetInitRoute} from './password-reset/init/password-reset-init.route';
import {registerRoute} from './register/register.route';
import {settingsRoute} from './settings/settings.route';
import {MainComponent} from '../layouts/main/main.component';
import {BlankComponent} from '../layouts/blank/blank.component';
import {loginRoute} from './login/login.route';


const ACCOUNT_ROUTES = [
  activateRoute, passwordRoute,
  settingsRoute
];
const BLANK_ROUTE = [
  registerRoute,
  passwordResetInitRoute,
  passwordResetFinishRoute,
  loginRoute
];

export const accountState: Routes = [
  {
    path: '',
    component: MainComponent,
    children: ACCOUNT_ROUTES
  },
  {
    path: '',
    component: BlankComponent,
    children: BLANK_ROUTE
  }
];
