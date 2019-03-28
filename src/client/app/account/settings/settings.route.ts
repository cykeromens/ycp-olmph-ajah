import {Route} from '@angular/router';

import {SettingsComponent} from './settings.component';
import {UserRouteAccessService} from '../../core/auth/user-route-access-service';

export const settingsRoute: Route = {
  path: 'settings',
  component: SettingsComponent,
  data: {
    authorities: ['ROLE_USER'],
    pageTitle: 'Settings'
  },
  canActivate: [UserRouteAccessService]
};
